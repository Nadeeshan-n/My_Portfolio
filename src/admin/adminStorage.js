const STORAGE_KEY = 'portfolio-admin-draft-v1';
const TOKEN_KEY = 'portfolio-admin-publish-token-v1';

export const getAdminDraft = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getLiveData = (fallback) => {
  const draft = getAdminDraft();
  return draft ? { ...fallback, ...draft } : fallback;
};

export const saveAdminDraft = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearAdminDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getPublishToken = () => sessionStorage.getItem(TOKEN_KEY) || '';

export const setPublishToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);

export const clearPublishToken = () => sessionStorage.removeItem(TOKEN_KEY);

const requestPublishApi = async (url, options = {}) => {
  let response = await fetch(url, options);
  if (response.status === 404 && url === '/api/admin/publish') {
    response = await fetch('/api/publish', options);
  }
  return response;
};

export const verifyPublishToken = async (token) => {
  try {
    const cleanToken = (token || '').trim();
    if (!cleanToken) return { ok: false, error: 'Please enter your ADMIN_PUBLISH_TOKEN.' };

    const response = await requestPublishApi('/api/admin/publish', {
      method: 'GET',
      headers: { Authorization: `Bearer ${cleanToken}` },
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      // response might not be JSON
    }

    if (response.ok) {
      return { ok: true, data };
    }
    return {
      ok: false,
      error: data?.error || (response.status === 401 ? 'Invalid ADMIN_PUBLISH_TOKEN. Please check your configured token.' : `Verification failed (HTTP ${response.status})`),
    };
  } catch (err) {
    return { ok: false, error: err.message || 'Could not connect to authentication server.' };
  }
};

export const loginAdmin = async (token) => {
  const cleanToken = (token || '').trim();
  const result = await verifyPublishToken(cleanToken);
  if (result.ok) {
    setPublishToken(cleanToken);
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
};

export const logoutAdmin = () => {
  clearPublishToken();
  sessionStorage.removeItem('portfolio-admin-auth');
};

export const publishAdminData = async (data, token = getPublishToken()) => {
  if (!token) throw new Error('Admin publish token is missing.');

  // Deep clone and deduplicate base64 data to keep payload well within Vercel's 4.5 MB request limit
  const payload = JSON.parse(JSON.stringify(data));
  if (Array.isArray(payload.projectList)) {
    payload.projectList = payload.projectList.map((project) => {
      const copy = { ...project };
      if (copy.imageUpload?.dataUrl && typeof copy.image === 'string' && copy.image.startsWith('data:')) {
        // Clearing duplicate base64 from copy.image cuts payload size in half
        copy.image = '';
      }
      return copy;
    });
  }

  const response = await requestPublishApi('/api/admin/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    // Ignore malformed error responses and use the HTTP status below.
  }

  if (!response.ok) {
    if (response.status === 413) {
      throw new Error('Payload too large (HTTP 413). Please choose a smaller image.');
    }
    throw new Error(result?.error || `Portfolio publishing failed (HTTP ${response.status}).`);
  }

  return result;
};

export const downloadAdminData = (data) => {
  const cleaned = JSON.parse(JSON.stringify(data));

  if (Array.isArray(cleaned.projectList)) {
    cleaned.projectList = cleaned.projectList.map((project) => ({
      ...project,
      technologies: Array.isArray(project.technologies)
        ? project.technologies
            .map((item) => (typeof item === 'string' ? item.trim() : item))
            .filter((item) => item !== '' && item !== null && item !== undefined)
        : [],
      keyFeatures: Array.isArray(project.keyFeatures)
        ? project.keyFeatures
            .map((item) => (typeof item === 'string' ? item.trim() : item))
            .filter((item) => item !== '' && item !== null && item !== undefined)
        : [],
    }));
  }

  const blob = new Blob([JSON.stringify(cleaned, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'portfolio-content.json';
  anchor.click();
  URL.revokeObjectURL(url);
};
