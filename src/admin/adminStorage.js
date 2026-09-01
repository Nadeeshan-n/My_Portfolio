const STORAGE_KEY = 'portfolio-admin-draft-v1';

export const getAdminDraft = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveAdminDraft = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearAdminDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const downloadAdminData = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'portfolio-content.json';
  anchor.click();
  URL.revokeObjectURL(url);
};
