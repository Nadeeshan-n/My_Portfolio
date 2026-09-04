import { useMemo, useState } from 'react';
import { allSkills, contactLinks, educationList, projectList } from '../data/data';
import {
  downloadAdminData,
  getAdminDraft,
  saveAdminDraft,
  clearAdminDraft,
  getPublishToken,
  setPublishToken,
  clearPublishToken,
  verifyPublishToken,
  publishAdminData,
} from './adminStorage';

const initialData = { projectList, educationList, allSkills, contactLinks };

const inputClass = 'w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30';
const buttonClass = 'rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800';
const primaryClass = 'rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 active:scale-[.98]';

const clone = (value) => JSON.parse(JSON.stringify(value));

const Field = ({ label, value, onChange, textarea = false, placeholder = '', type = 'text' }) => (
  <label className="block space-y-2">
    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</span>
    {textarea ? (
      <textarea rows={5} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    ) : (
      <input type={type} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    )}
  </label>
);

const readImage = (file) => new Promise((resolve, reject) => {
  if (!file) return reject(new Error('No image selected.'));
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return reject(new Error('Please choose a JPG, PNG, or WebP image.'));
  if (file.size > 2 * 1024 * 1024) return reject(new Error('Please choose an image smaller than 2 MB.'));
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Could not read the image.'));
  reader.readAsDataURL(file);
});

const SectionHeader = ({ title, description, action }) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div><h2 className="text-2xl font-bold text-white">{title}</h2><p className="mt-1 text-sm text-zinc-500">{description}</p></div>
    {action}
  </div>
);

function ProjectsEditor({ items, setItems }) {
  const [selected, setSelected] = useState(0);
  const [uploadingPreview, setUploadingPreview] = useState(false);
  const item = items[selected];
  const update = (key, value) => setItems(items.map((entry, i) => i === selected ? { ...entry, [key]: value } : entry));
  const updateArray = (key, value) => update(key, value.split('\n'));
  const add = () => { setItems([...items, { title: 'New Project', desc: '', fullDescription: '', contributionType: 'Individual Project', technologies: [], keyFeatures: [], link: '#', githubLink: '', image: '' }]); setSelected(items.length); };
  const remove = () => { if (!window.confirm('Delete this project from the current draft?')) return; const next = items.filter((_, i) => i !== selected); setItems(next); setSelected(Math.max(0, Math.min(selected, next.length - 1))); };

  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setUploadingPreview(true);
    try {
      const dataUrl = await readImage(file);
      update('image', dataUrl);
      update('imageUpload', { dataUrl });
    } catch (error) {
      window.alert(error.message || 'Image upload failed.');
    } finally {
      setUploadingPreview(false);
    }
  };

  return <>
    <SectionHeader title="Projects" description="Manage the work displayed in Selected Works." action={<button onClick={add} className={primaryClass}>+ Add project</button>} />
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3">
        {items.map((entry, i) => <button key={i} onClick={() => setSelected(i)} className={`w-full rounded-xl p-3 text-left transition ${selected === i ? 'bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30' : 'text-zinc-400 hover:bg-zinc-800'}`}><div className="truncate text-sm font-semibold">{entry.title || 'Untitled project'}</div><div className="mt-1 text-xs text-zinc-600">Project {i + 1}</div></button>)}
      </div>
      {item && <div className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-7">
        <div className="flex justify-end"><button onClick={remove} className="text-xs font-medium text-red-400 hover:text-red-300">Delete project</button></div>
        <div className="grid gap-5 md:grid-cols-2"><Field label="Title" value={item.title} onChange={(v) => update('title', v)} /><Field label="Contribution" value={item.contributionType} onChange={(v) => update('contributionType', v)} /></div>
        <Field label="Short description" value={item.desc} onChange={(v) => update('desc', v)} textarea />
        <Field label="Full description" value={item.fullDescription} onChange={(v) => update('fullDescription', v)} textarea />
        <Field label="Technologies (one per line)" value={(item.technologies || []).join('\n')} onChange={(v) => updateArray('technologies', v)} textarea />
        <Field label="Key features (one per line)" value={(item.keyFeatures || []).join('\n')} onChange={(v) => updateArray('keyFeatures', v)} textarea />
        <div className="grid gap-5 md:grid-cols-2"><Field label="Live/demo URL" value={item.link} onChange={(v) => update('link', v)} /><Field label="GitHub URL" value={item.githubLink} onChange={(v) => update('githubLink', v)} /></div>
        <div className="space-y-3">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Project image</span>
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 p-4">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800">
              {uploadingPreview ? 'Reading image...' : 'Choose image'}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} className="hidden" disabled={uploadingPreview} />
            </label>
            <p className="mt-2 text-xs text-zinc-600">JPG, PNG, or WebP • maximum 2 MB. The image is uploaded to GitHub when you publish.</p>
          </div>
        </div>
        <Field label="Image URL (optional)" value={typeof item.image === 'string' && !item.image.startsWith('data:') ? item.image : ''} onChange={(v) => { update('image', v); update('imageUpload', null); }} placeholder="Or use an external image URL" />
        {item.image && <img src={item.image} alt="Project preview" className="h-40 w-full rounded-xl border border-zinc-800 object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
      </div>}
    </div>
  </>;
}

function SkillsEditor({ items, setItems }) {
  const update = (index, key, value) => setItems(items.map((entry, i) => i === index ? { ...entry, [key]: value } : entry));
  const add = () => setItems([...items, { name: 'New Skill', logo: '' }]); const remove = (index) => setItems(items.filter((_, i) => i !== index));
  return <><SectionHeader title="Skills" description="Add, remove, or update the technical skills shown on the portfolio." action={<button onClick={add} className={primaryClass}>+ Add skill</button>} /><div className="grid gap-4 md:grid-cols-2">{items.map((item, i) => <div key={i} className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">{item.logo ? <img src={item.logo} alt="" className="h-12 w-12 shrink-0 rounded-xl bg-zinc-950 p-2 object-contain" /> : <div className="h-12 w-12 shrink-0 rounded-xl bg-zinc-950" />}<div className="min-w-0 flex-1 space-y-3"><Field label="Name" value={item.name} onChange={(v) => update(i, 'name', v)} /><Field label="Logo URL" value={item.logo} onChange={(v) => update(i, 'logo', v)} /></div><button onClick={() => remove(i)} className="self-start text-xs text-red-400 hover:text-red-300">Delete</button></div>)}</div></>;
}

function EducationEditor({ items, setItems }) {
  const update = (index, key, value) => setItems(items.map((entry, i) => i === index ? { ...entry, [key]: value } : entry));
  const add = () => setItems([...items, { degree: 'New qualification', institution: '', institutionLink: '', period: '', description: '', image: '' }]); const remove = (index) => setItems(items.filter((_, i) => i !== index));
  return <><SectionHeader title="Education" description="Manage degrees, certifications, institutions, and reference images." action={<button onClick={add} className={primaryClass}>+ Add education</button>} /><div className="space-y-5">{items.map((item, i) => <div key={i} className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-7"><div className="flex justify-end"><button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">Delete</button></div><div className="grid gap-5 md:grid-cols-2"><Field label="Degree / qualification" value={item.degree} onChange={(v) => update(i, 'degree', v)} /><Field label="Period" value={item.period} onChange={(v) => update(i, 'period', v)} /></div><div className="grid gap-5 md:grid-cols-2"><Field label="Institution" value={item.institution} onChange={(v) => update(i, 'institution', v)} /><Field label="Institution URL" value={item.institutionLink} onChange={(v) => update(i, 'institutionLink', v)} /></div><Field label="Description" value={item.description} onChange={(v) => update(i, 'description', v)} textarea /><Field label="Image URL" value={item.image} onChange={(v) => update(i, 'image', v)} /></div>)}</div></>;
}

function ContactEditor({ items, setItems }) {
  const update = (index, key, value) => setItems(items.map((entry, i) => i === index ? { ...entry, [key]: value } : entry));
  const add = () => setItems([...items, { platform: 'New', handle: '', link: '', icon: 'Mail' }]); const remove = (index) => setItems(items.filter((_, i) => i !== index));
  return <><SectionHeader title="Contact & social" description="Control the links shown in the Let's Connect section." action={<button onClick={add} className={primaryClass}>+ Add link</button>} /><div className="space-y-4">{items.map((item, i) => <div key={i} className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end"><Field label="Platform" value={item.platform} onChange={(v) => update(i, 'platform', v)} /><Field label="Handle" value={item.handle} onChange={(v) => update(i, 'handle', v)} /><Field label="Link" value={item.link} onChange={(v) => update(i, 'link', v)} /><button onClick={() => remove(i)} className="pb-3 text-xs text-red-400">Delete</button></div>)}</div></>;
}

export default function Admin() {
  const [data, setData] = useState(() => clone(getAdminDraft() || initialData));
  const [section, setSection] = useState('dashboard'); const [status, setStatus] = useState(''); const [loggedIn, setLoggedIn] = useState(() => Boolean(getPublishToken())); const [password, setPassword] = useState(''); const [loggingIn, setLoggingIn] = useState(false); const [publishing, setPublishing] = useState(false);
  const stats = useMemo(() => ({ projects: data.projectList.length, skills: data.allSkills.length, education: data.educationList.length, contacts: data.contactLinks.length }), [data]);
  const save = async () => { setPublishing(true); setStatus('Publishing...'); saveAdminDraft(data); try { await publishAdminData(data); setStatus('Published successfully. Vercel is deploying the update.'); } catch (error) { setStatus(error.message || 'Publishing failed. Your draft is still saved locally.'); } finally { setPublishing(false); } };
  const reset = () => { if (!window.confirm('Discard the local admin draft and restore the original portfolio data?')) return; clearAdminDraft(); setData(clone(initialData)); setStatus('Draft reset.'); };
  const update = (key, value) => setData((current) => ({ ...current, [key]: value }));
  const login = async (event) => { event.preventDefault(); if (!password.trim()) return; setLoggingIn(true); setStatus('Checking credentials...'); try { const valid = await verifyPublishToken(password.trim()); if (!valid) throw new Error('Invalid admin token.'); setPublishToken(password.trim()); setLoggedIn(true); setPassword(''); setStatus('Signed in.'); } catch (error) { setStatus(error.message || 'Unable to sign in.'); } finally { setLoggingIn(false); } };
  const logout = () => { clearPublishToken(); sessionStorage.removeItem('portfolio-admin-auth'); setLoggedIn(false); setStatus(''); };
  if (!loggedIn) return <div className="min-h-screen bg-zinc-950 px-6 text-zinc-100"><div className="mx-auto flex min-h-screen max-w-md items-center"><div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.25em] text-indigo-400">Portfolio CMS</p><h1 className="mt-3 text-3xl font-bold">Admin access</h1><p className="mt-2 text-sm text-zinc-500">Use the private admin publish token configured in Vercel. It is never included in the public build.</p></div><form onSubmit={login} className="space-y-4"><Field label="Admin publish token" type="password" value={password} onChange={setPassword} placeholder="Enter your private token" /><button className={`${primaryClass} w-full disabled:opacity-50`} type="submit" disabled={loggingIn}>{loggingIn ? 'Checking...' : 'Sign in'}</button></form>{status && <p className="mt-4 text-center text-xs text-zinc-500">{status}</p>}<p className="mt-4 text-center text-xs text-zinc-600">Do not put this token in your source code or a VITE_ variable.</p></div></div></div>;
  const nav = [['dashboard','Dashboard'],['projects','Projects'],['skills','Skills'],['education','Education'],['contact','Contact']];
  return <div className="min-h-screen bg-zinc-950 text-zinc-100"><aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-900 bg-zinc-950/95 p-5 lg:block"><div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[.25em] text-indigo-400">Portfolio CMS</p><h1 className="mt-2 text-xl font-bold">Admin Console</h1></div><nav className="space-y-1">{nav.map(([id,label]) => <button key={id} onClick={() => setSection(id)} className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${section === id ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-300'}`}>{label}</button>)}</nav><button onClick={logout} className="absolute bottom-6 left-5 text-sm text-zinc-600 hover:text-zinc-300">Sign out</button></aside><main className="min-h-screen lg:ml-64"><header className="sticky top-0 z-20 border-b border-zinc-900 bg-zinc-950/85 px-6 py-4 backdrop-blur-xl md:px-10"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-wider text-zinc-600">Portfolio / Admin</p><h2 className="text-lg font-semibold capitalize">{section}</h2></div><div className="flex flex-wrap gap-2"><button onClick={() => downloadAdminData(data)} className={buttonClass}>Export JSON</button><button onClick={reset} className={buttonClass}>Reset</button><button onClick={save} disabled={publishing} className={`${primaryClass} disabled:cursor-wait disabled:opacity-60`}>{publishing ? 'Publishing...' : 'Publish changes'}</button></div></div>{status && <p className="mt-3 text-sm text-indigo-300">{status}</p>}<div className="mt-3 flex gap-1 overflow-x-auto lg:hidden">{nav.map(([id,label]) => <button key={id} onClick={() => setSection(id)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs ${section === id ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>{label}</button>)}</div></header><div className="mx-auto max-w-7xl p-6 md:p-10">{section === 'dashboard' && <><SectionHeader title="Portfolio overview" description="Edit your portfolio and publish changes directly to GitHub." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(stats).map(([key,value]) => <div key={key} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"><p className="text-xs uppercase tracking-wider text-zinc-600">{key}</p><p className="mt-3 text-4xl font-black text-white">{value}</p></div>)}</div><div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6"><h3 className="font-semibold text-indigo-300">Publishing flow</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Your edits are saved locally as a draft and, when you click Publish changes, sent to a protected Vercel Function. The function uses the server-side GitHub token to update the portfolio data file. Your GitHub commit then triggers the normal Vercel deployment.</p></div></>}{section === 'projects' && <ProjectsEditor items={data.projectList} setItems={(v) => update('projectList', typeof v === 'function' ? v(data.projectList) : v)} />}{section === 'skills' && <SkillsEditor items={data.allSkills} setItems={(v) => update('allSkills', typeof v === 'function' ? v(data.allSkills) : v)} />}{section === 'education' && <EducationEditor items={data.educationList} setItems={(v) => update('educationList', typeof v === 'function' ? v(data.educationList) : v)} />}{section === 'contact' && <ContactEditor items={data.contactLinks} setItems={(v) => update('contactLinks', typeof v === 'function' ? v(data.contactLinks) : v)} />}</div></main></div>;
}
