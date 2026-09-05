import fs from 'node:fs';
import path from 'node:path';

const REPO = process.env.GITHUB_REPO || 'Nadeeshan-n/My_Portfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const DATA_PATH = 'src/data/data.js';
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const sendJson = (res, body, status = 200) => {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(body);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.end(JSON.stringify(body));
};

const getToken = (req) => {
  const value = req.headers?.authorization || req.headers?.Authorization || '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
};

const isAuthorized = (req) => {
  const expected = process.env.ADMIN_PUBLISH_TOKEN;
  const provided = getToken(req);
  if (!expected) {
    // When no admin token is configured in environment, allow any non-empty token
    return Boolean(provided);
  }
  return Boolean(provided && provided === expected);
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

const saveImageLocally = async (base64, filename) => {
  const assetsDir = path.resolve(process.cwd(), 'src/assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  const filePath = path.join(assetsDir, filename);
  await fs.promises.writeFile(filePath, Buffer.from(base64, 'base64'));
};

const uploadImage = async (dataUrl, projectTitle, index) => {
  const cleanDataUrl = String(dataUrl || '').trim();
  const match = /^data:image\/([a-z0-9.+_-]+);base64,([\s\S]+)$/i.exec(cleanDataUrl);
  if (!match) throw new Error('Invalid project image. Please choose a JPG, PNG, or WebP image.');

  const base64 = match[2].replace(/\s+/g, '');
  const bytes = Buffer.byteLength(base64, 'base64');
  if (bytes > MAX_IMAGE_BYTES) throw new Error('Project image is too large. Please use an image smaller than 2 MB.');

  const rawExt = match[1].toLowerCase();
  const extension = rawExt === 'jpeg' || rawExt === 'jpg' ? 'jpg' : rawExt === 'png' ? 'png' : rawExt === 'webp' ? 'webp' : 'jpg';
  const filename = `admin-${slug(projectTitle)}-${Date.now()}-${index}.${extension}`;
  const localAssetPath = `/assets/${filename}`;

  if (process.env.GITHUB_TOKEN) {
    const gitPath = `src/assets/${filename}`;
    const response = await githubRequest(`/repos/${REPO}/contents/${gitPath}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Upload project image: ${projectTitle || 'project'}`, content: base64, branch: BRANCH }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('GitHub image upload failed:', response.status, details);
      let msg = 'GitHub rejected the project image upload.';
      try {
        const parsed = JSON.parse(details);
        if (parsed?.message) msg = `GitHub image upload rejected: ${parsed.message}`;
      } catch {}
      throw new Error(msg);
    }
  } else {
    // Save image to local src/assets folder when GITHUB_TOKEN is not configured
    await saveImageLocally(base64, filename);
  }

  return { filename, path: localAssetPath };
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

    if (process.env.GITHUB_TOKEN) {
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
        const details = await updateResponse.text();
        console.error('GitHub write failed:', updateResponse.status, details);
        let msg = 'GitHub rejected the portfolio update.';
        try {
          const parsed = JSON.parse(details);
          if (parsed?.message) msg = `GitHub portfolio update rejected: ${parsed.message}`;
        } catch {}
        return sendJson(res, { error: msg }, 502);
      }

      const result = await updateResponse.json();
      return sendJson(res, { ok: true, message: 'Portfolio published successfully. Vercel will redeploy from the GitHub commit.', commit: result.commit?.sha || null, imageUpdates });
    } else {
      // Local development or preview environment: write source directly to src/data/data.js
      const localFilePath = path.resolve(process.cwd(), DATA_PATH);
      await fs.promises.writeFile(localFilePath, source, 'utf8');
      return sendJson(res, {
        ok: true,
        message: 'Portfolio published successfully! Data saved to local files.',
        commit: null,
        imageUpdates
      });
    }
  } catch (error) {
    console.error('Admin publish function error:', error);
    return sendJson(res, { error: error instanceof Error ? error.message : 'Publish failed.' }, 500);
  }
}
