'use client';

import type { ReactNode } from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
