import { useState } from 'react';
import { Lock, Unlock, Key, Eye, EyeOff, ShieldCheck, ArrowLeft, XIcon } from '../components/icons/Icons';
import { loginAdmin } from './adminStorage';

export default function AdminLogin({ onLoginSuccess, onCancel, isModal = false }) {
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clean = token.trim();
    if (!clean) {
      setError('Please enter your ADMIN_PUBLISH_TOKEN.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loginAdmin(clean);
      if (res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(clean, res.data);
        }
      } else {
        setError(res.error || 'Authentication failed. Please verify your token.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while verifying the token.');
    } finally {
      setLoading(false);
    }
  };

  const cardContent = (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/95 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Header with dismiss or back */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          <ShieldCheck size={14} className="text-indigo-400" />
          <span>Admin Authentication</span>
        </div>

        {isModal && onCancel && (
          <button
            onClick={onCancel}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            title="Close"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>

      <div className="relative mb-6 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Admin Console
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          Enter your private <span className="font-mono text-xs text-indigo-300 bg-zinc-950/80 px-1.5 py-0.5 rounded border border-zinc-800">ADMIN_PUBLISH_TOKEN</span> to unlock CMS editing and publishing privileges.
        </p>
      </div>

      {error && (
        <div className="relative mb-5 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs leading-relaxed text-red-300 animate-in fade-in">
          <div className="mt-0.5 shrink-0 rounded-full bg-red-500/20 p-1 text-red-400">
            <Lock size={14} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-red-200">Access Denied</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Key size={14} className="text-indigo-400" />
              Secret Publish Token
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your ADMIN_PUBLISH_TOKEN"
              autoFocus
              disabled={loading}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3.5 pr-11 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
              title={showPassword ? 'Hide token' : 'Show token'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !token.trim()}
          className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Verifying token...</span>
            </>
          ) : (
            <>
              <Unlock size={16} className="transition-transform group-hover:scale-110" />
              <span>Sign in to Admin Console</span>
            </>
          )}
        </button>
      </form>

      {/* Helpful Token Guidance */}
      <div className="relative mt-5 border-t border-zinc-800/80 pt-4">
        <button
          type="button"
          onClick={() => setInfoOpen(!infoOpen)}
          className="flex w-full items-center justify-between text-left text-xs font-medium text-zinc-500 hover:text-zinc-300 transition"
        >
          <span>Where is ADMIN_PUBLISH_TOKEN configured?</span>
          <span className="text-zinc-600">{infoOpen ? '−' : '+'}</span>
        </button>

        {infoOpen && (
          <div className="mt-2.5 rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-3 text-xs leading-relaxed text-zinc-400 space-y-1.5 animate-in fade-in">
            <p>
              • In production: Set <strong className="text-zinc-200">ADMIN_PUBLISH_TOKEN</strong> in your <strong className="text-zinc-200">Vercel Project Settings → Environment Variables</strong>.
            </p>
            <p>
              • In development: Define it in your local environment file or provide your secret.
            </p>
            <p className="text-zinc-500 text-[11px]">
              The token is verified securely server-side and is never baked into the public browser build.
            </p>
          </div>
        )}
      </div>

      {!isModal && onCancel && (
        <div className="relative mt-6 text-center">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-300"
          >
            <ArrowLeft size={14} />
            <span>Return to Live Portfolio</span>
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
          onClick={onCancel}
        />
        <div className="relative z-10 w-full max-w-md">
          {cardContent}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {cardContent}
    </div>
  );
}
