import { useState } from 'react';
import { getAdminDraft } from './adminStorage';

export default function Publish() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const draft = getAdminDraft();

  const publish = async () => {
    if (!draft) { setStatus('No saved draft found. Save your changes in Admin first.'); return; }
    setStatus('Publishing…');
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify(draft),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Publish failed');
      setStatus('Published successfully. Your deployment will update shortly.');
    } catch (error) {
      setStatus(error.message || 'Publish failed');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-6 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-xl items-center">
        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-indigo-400">Portfolio CMS</p>
          <h1 className="mt-3 text-3xl font-bold">Publish changes</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">This publishes the saved browser draft to the repository through the server-side API. Your GitHub token never reaches the browser.</p>
          <div className="mt-8 space-y-4">
            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Publish password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-indigo-500/60" placeholder="Enter ADMIN_PUBLISH_TOKEN" />
            </label>
            <button onClick={publish} className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">Publish to GitHub</button>
            {status && <p className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">{status}</p>}
          </div>
          <a href="/admin" className="mt-6 inline-block text-sm text-zinc-500 hover:text-white">← Back to Admin</a>
        </div>
      </div>
    </div>
  );
}
