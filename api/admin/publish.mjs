const REPO = process.env.GITHUB_REPO || 'Nadeeshan-n/My_Portfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const DATA_PATH = 'src/data/data.js';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
const getToken = (request) => {
  const value = request.headers.get('authorization') || '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
};
const isAuthorized = (request) => {
  const expected = process.env.ADMIN_PUBLISH_TOKEN;
  const provided = getToken(request);
  return Boolean(expected && provided && provided === expected);
};
const cleanArray = (value) => Array.isArray(value) ? value.map((item) => typeof item === 'string' ? item.trim() : item).filter((item) => item !== '' && item !== null && item !== undefined) : [];

const cleanData = (input) => ({
  projectList: Array.isArray(input?.projectList) ? input.projectList.map((project) => ({
    title: String(project.title || ''), desc: String(project.desc || ''), fullDescription: String(project.fullDescription || ''), contributionType: String(project.contributionType || ''), technologies: cleanArray(project.technologies), keyFeatures: cleanArray(project.keyFeatures), link: String(project.link || '#'), githubLink: String(project.githubLink || ''), ...(project.imageKey ? { imageKey: String(project.imageKey) } : {}), image: typeof project.image === 'string' ? project.image : '',
  })) : [],
  educationList: Array.isArray(input?.educationList) ? input.educationList.map((item) => ({ degree: String(item.degree || ''), institutionLink: String(item.institutionLink || ''), institution: String(item.institution || ''), period: String(item.period || ''), description: String(item.description || ''), image: typeof item.image === 'string' ? item.image : '' })) : [],
  allSkills: Array.isArray(input?.allSkills) ? input.allSkills.map((item) => ({ name: String(item.name || ''), logo: String(item.logo || '') })) : [],
  contactLinks: Array.isArray(input?.contactLinks) ? input.contactLinks.map((item) => ({ platform: String(item.platform || ''), handle: String(item.handle || ''), link: String(item.link || ''), icon: String(item.icon || 'Mail') })) : [],
});

const escape = (value) => JSON.stringify(value);

const createDataSource = (data) => {
  const imports = [
    "import weatherImg from '../assets/weather.jpg';",
    "import driveSmartImg from '../assets/drive_smart.png';",
    "import aiAgentImg from '../assets/AI-Agent.jpg';",
    '',
  ].join('\n');

  const projects = data.projectList.map((project) => {
    const isBundledImage = project.imageKey && typeof project.image === 'string' && project.image.startsWith('/assets/');
    const image = isBundledImage && project.imageKey === 'weather'
      ? 'weatherImg'
      : isBundledImage && project.imageKey === 'driveSmart'
        ? 'driveSmartImg'
        : isBundledImage && project.imageKey === 'aiAgent'
          ? 'aiAgentImg'
          : escape(project.image || '');

    const copy = { ...project };
    delete copy.imageKey;
    delete copy.image;
    return `  {\n    ${Object.entries(copy).map(([key, value]) => `${key}: ${escape(value)},`).join('\n    ')}\n    image: ${image},\n  },`;
  }).join('\n');

  return `${imports}\nexport const projectList = [\n${projects}\n];\n\nexport const educationList = ${JSON.stringify(data.educationList, null, 2)};\n\nexport const allSkills = ${JSON.stringify(data.allSkills, null, 2)};\n\nexport const contactLinks = ${JSON.stringify(data.contactLinks, null, 2)};\n`;
};

const githubRequest = async (path, options = {}) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not configured.');
  return fetch(`https://api.github.com${path}`, {
    ...options,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', ...(options.headers || {}) },
  });
};

export default async function handler(request) {
  if (!isAuthorized(request)) return json({ error: 'Unauthorized' }, 401);
  if (request.method === 'GET') return json({ ok: true, message: 'Admin publishing is configured.' });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await request.json();
    const data = cleanData(body);
    const source = createDataSource(data);
    const currentResponse = await githubRequest(`/repos/${REPO}/contents/${DATA_PATH}?ref=${encodeURIComponent(BRANCH)}`);
    if (!currentResponse.ok) return json({ error: 'Could not read portfolio data from GitHub.' }, 502);

    const current = await currentResponse.json();
    const updateResponse = await githubRequest(`/repos/${REPO}/contents/${DATA_PATH}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update portfolio content from admin', content: Buffer.from(source, 'utf8').toString('base64'), sha: current.sha, branch: BRANCH }),
    });

    if (!updateResponse.ok) return json({ error: 'GitHub rejected the portfolio update.' }, 502);
    const result = await updateResponse.json();
    return json({ ok: true, message: 'Portfolio published successfully. Vercel will redeploy from the GitHub commit.', commit: result.commit?.sha || null });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Publish failed.' }, 500);
  }
}
