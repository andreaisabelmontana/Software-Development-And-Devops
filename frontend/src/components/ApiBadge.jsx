import { useEffect, useState } from 'react';
import { getApiMode } from '../lib/api.js';

export default function ApiBadge() {
  const [mode, setMode] = useState('…');
  useEffect(() => { getApiMode().then(setMode); }, []);
  if (mode === '…') return null;
  return (
    <div className={`api-mode ${mode}`} title={
      mode === 'live'
        ? 'Connected to the FastAPI backend (VITE_API_URL).'
        : 'Demo mode — using seeded data because no backend is configured or reachable.'
    }>
      {mode === 'live' ? '● live api' : '● demo mode'}
    </div>
  );
}
