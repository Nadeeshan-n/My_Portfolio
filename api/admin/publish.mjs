const REPO = process.env.GITHUB_REPO || 'Nadeeshan-n/My_Portfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const DATA_PATH = 'src/data/data.js';
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const sendJson = (res, body, status = 200) => res.status(status).json(body);

const getToken = (req) => {
  const value = req.headers.authorization || '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
};

const isAuthorized = (req) => {
  const expected = process.env.ADMIN_PUBLISH_TOKEN;
  const provided = getToken(req);
  return Boolean(expected && provided && provided === expected);
};

const cleanArray = (value) => Array.isArray(value)
  ? value.map((item) => typeof item === 'string' ? item.trim() : item).filter((item) => item !== '' && item !== null && item !== undefined)
  : [];

const cleanData = (input) => ({
  projectList: Array.isArray(input?.projectList) ? input.projectList.map((project) => ({
    title: String(project.title || ''),
    desc: String(project.desc || ''),
    fullDescription: String(project.fullDescription || ''),
    contributionType: String(project.contributionType || ''),
    technologies: cleanArray(project.technologies),
    keyFeatures: cleanArray(project.keyFeatures),
    link: String(project.link || '#'),
    githubLink: String(project.githubLink || ''),
    ...(project.imageKey ? { imageKey: String(project.imageKey) } : {}),
    image: typeof project.image === 'string' ? project.image : '',
    imageUpload: project.imageUpload && typeof project.imageUpload.dataUrl === 'string' ? { dataUrl: project.imageUpload.dataUrl } : null,
  })) : [],
  educationList: Array.isArray(input?.educationList) ? input.educationList.map((item) => ({
    degree: String(item.degree || ''), institutionLink: String(item.institutionLink || ''), institution: String(item.institution || ''), period: String(item.period || ''), description: String(item.description || ''), image: typeof item.image === 'string' ? item.image : '',
  })) : [],
  allSkills: Array.isArray(input?.allSkills) ? input.allSkills.map((item) => ({ name: String(item.name || ''), logo: String(item.logo || '') })) : [],
  contactLinks: Array.isArray(input?.contactLinks) ? input.contactLinks.map((item) => ({ platform: String(item.platform || ''), handle: String(item.handle || ''), link: String(item.link || ''), icon: String(item.icon || 'Mail') })) : [],
});

const githubRequest = async (path, options = {}) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not configured.');
  return fetch(`https://api.github.com${path}`, {
    ...options,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', ...(options.headers || {}) },
  });
};

const slug = (value) => String(value || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'project';

const uploadImage = async (dataUrl, projectTitle, index) => {
  const match = /^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/i.exec(dataUrl || '');
  if (!match) throw new Error('Invalid project image. Please choose a JPG, PNG, or WebP image.');

  const base64 = match[2];
  const bytes = Buffer.byteLength(base64, 'base64');
  if (bytes > MAX_IMAGE_BYTES) throw new Error('Project image is too large. Please use an image smaller than 2 MB.');

  // The Admin UI currently sends optimized JPEG data, but preserve a safe extension for future formats.
  const extension = match[1].toLowerCase() === 'jpg' ? 'jpg' : match[1].toLowerCase();
  const filename = `admin-${slug(projectTitle)}-${Date.now()}-${index}.${extension}`;
  const path = `src/assets/${filename}`;

  const response = await githubRequest(`/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Upload project image: ${projectTitle || 'project'}`, content: base64, branch: BRANCH }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error('GitHub image upload failed:', response.status, details);
    throw new Error('GitHub rejected the project image upload.');
  }

  return { filename, path: `/assets/${filename}` };
};

const createDataSource = (data) => {
  const imports = [
    "import weatherImg from '../assets/weather.jpg';",
    "import driveSmartImg from '../assets/drive_smart.png';",
    "import aiAgentImg from '../assets/AI-Agent.jpg';",
  ];

  const projects = data.projectList.map((project, index) => {
    let image = JSON.stringify(project.image || '');

    if (project.imageKey && project.image && project.image.startsWith('/assets/')) {
      image = project.imageKey === 'weather' ? 'weatherImg' : project.imageKey === 'driveSmart' ? 'driveSmartImg' : project.imageKey === 'aiAgent' ? 'aiAgentImg' : JSON.stringify(project.image);
    } else if (project.image && project.image.startsWith('/assets/')) {
      const filename = project.image.split('/').pop();
      const variable = `adminProjectImage${index}`;
      imports.push(`import ${variable} from '../assets/${filename}';`);
      image = variable;
    }

    const copy = { ...project };
    delete copy.imageKey;
    delete copy.image;
    delete copy.imageUpload;

    return `  {\n    ${Object.entries(copy).map(([key, value]) => `${key}: ${JSON.stringify(value)},`).join('\n    ')}\n    image: ${image},\n  },`;
  }).join('\n');

  return `${imports.join('\n')}\n\nexport const projectList = [\n${projects}\n];\n\nexport const educationList = ${JSON.stringify(data.educationList, null, 2)};\n\nexport const allSkills = ${JSON.stringify(data.allSkills, null, 2)};\n\nexport const contactLinks = ${JSON.stringify(data.contactLinks, null, 2)};\n`;
};

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url || '/', 'https://portfolio.local');
      if (url.searchParams.get('check') === 'config') {
        return sendJson(res, { ok: true, adminTokenConfigured: Boolean(process.env.ADMIN_PUBLISH_TOKEN), githubTokenConfigured: Boolean(process.env.GITHUB_TOKEN), repositoryConfigured: Boolean(REPO), branchConfigured: Boolean(BRANCH) });
      }
      if (!isAuthorized(req)) return sendJson(res, { error: 'Unauthorized' }, 401);
      return sendJson(res, { ok: true, message: 'Admin publishing is configured.' });
    }

    if (!isAuthorized(req)) return sendJson(res, { error: 'Unauthorized' }, 401);
    if (req.method !== 'POST') return sendJson(res, { error: 'Method not allowed' }, 405);

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const data = cleanData(body);
    const imageUpdates = [];

    // Upload selected project images first, then generate data.js imports for them.
    for (let index = 0; index < data.projectList.length; index += 1) {
      const project = data.projectList[index];
      if (project.imageUpload?.dataUrl) {
        const uploaded = await uploadImage(project.imageUpload.dataUrl, project.title, index);
        project.image = uploaded.path;
        project.imageKey = null;
        imageUpdates.push({ index, path: uploaded.path });
      }
    }

    const source = createDataSource(data);
    const currentResponse = await githubRequest(`/repos/${REPO}/contents/${DATA_PATH}?ref=${encodeURIComponent(BRANCH)}`);
    if (!currentResponse.ok) {
      console.error('GitHub read failed:', currentResponse.status, await currentResponse.text());
      return sendJson(res, { error: 'Could not read portfolio data from GitHub.' }, 502);
    }

    const current = await currentResponse.json();
    const updateResponse = await githubRequest(`/repos/${REPO}/contents/${DATA_PATH}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update portfolio content from admin', content: Buffer.from(source, 'utf8').toString('base64'), sha: current.sha, branch: BRANCH }),
    });

    if (!updateResponse.ok) {
      console.error('GitHub write failed:', updateResponse.status, await updateResponse.text());
      return sendJson(res, { error: 'GitHub rejected the portfolio update.' }, 502);
    }

    const result = await updateResponse.json();
    return sendJson(res, { ok: true, message: 'Portfolio published successfully. Vercel will redeploy from the GitHub commit.', commit: result.commit?.sha || null, imageUpdates });
  } catch (error) {
    console.error('Admin publish function error:', error);
    return sendJson(res, { error: error instanceof Error ? error.message : 'Publish failed.' }, 500);
  }
}
