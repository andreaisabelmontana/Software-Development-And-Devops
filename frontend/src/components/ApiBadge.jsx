import { useEffect, useState } from 'react';
import { getApiMode } from '../lib/api.js';

const LABEL = {
  live:      '● live api',
  fakestore: '● fakestoreapi',
  offline:   '● offline mode',
};

const TITLE = {
  live:      'Connected to the FastAPI backend at VITE_API_URL.',
  fakestore: 'Fetching real products from fakestoreapi.com — the same data the team seeds into their FastAPI.',
  offline:   'No backend and no internet — using a tiny built-in seed catalog.',
};

export default function ApiBadge() {
  const [mode, setMode] = useState('…');
  useEffect(() => { getApiMode().then(setMode); }, []);
  if (mode === '…') return null;
  return (
    <div className={`api-mode ${mode}`} title={TITLE[mode]}>
      {LABEL[mode]}
    </div>
  );
}
