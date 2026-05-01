'use client';

import dynamic from 'next/dynamic';

// Three.js must never run on the server — this client wrapper owns the dynamic import
const WebGLSceneLazy = dynamic(
  () => import('./WebGLScene').then((m) => m.WebGLScene),
  { ssr: false }
);

export function WebGLSceneClient({ className }: { className?: string }) {
  return <WebGLSceneLazy className={className} />;
}
