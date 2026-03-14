'use client';

import dynamic from 'next/dynamic';

const ChatBubble = dynamic(() => import('@/components/common/ChatBubble'), {
  ssr: false,
  loading: () => null,
});

const OnekoCat = dynamic(() => import('@/components/common/OnekoCat'), {
  ssr: false,
  loading: () => null,
});

export default function ClientOverlays(): React.JSX.Element {
  return (
    <>
      <OnekoCat />
      <ChatBubble />
    </>
  );
}
