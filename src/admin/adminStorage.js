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

export const verifyPublishToken = async (token) => {
  const response = await fetch('/api/admin/publish', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
};

export const publishAdminData = async (data, token = getPublishToken()) => {
  if (!token) throw new Error('Admin publish token is missing.');

  const response = await fetch('/api/admin/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    // Ignore malformed error responses and use the HTTP status below.
  }

  if (!response.ok) {
    throw new Error(result?.error || 'Portfolio publishing failed.');
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
