'use client';

import dynamic from 'next/dynamic';

const Github = dynamic(() => import('@/components/landing/Github'), {
  ssr: false,
  loading: () => (
    <div className="mt-16 w-full rounded-2xl border border-border bg-card/20 p-4 md:mt-20">
      <div className="h-75 w-full animate-pulse rounded-xl bg-muted/40" />
    </div>
  ),
});

export default function GithubClient(): React.JSX.Element {
  return <Github />;
}
