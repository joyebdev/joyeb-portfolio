'use client';

import { cn } from '@/lib/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

type LenisControl = {
  start?: () => void;
  stop?: () => void;
};

type LenisContainer = {
  lenis?: LenisControl;
};

function resolveLenisControl(value: unknown): LenisControl | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const direct = value as LenisControl;
  if (typeof direct.start === 'function' || typeof direct.stop === 'function') {
    return direct;
  }

  const nested = (value as LenisContainer).lenis;
  if (
    nested &&
    (typeof nested.start === 'function' || typeof nested.stop === 'function')
  ) {
    return nested;
  }

  return null;
}

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const lenisControlRef = React.useRef<LenisControl | null>(null);

  React.useEffect(() => {
    type WindowWithLenis = Window & { lenis?: unknown };

    const assignLenisControl = () => {
      if (typeof window === 'undefined') {
        return;
      }

      lenisControlRef.current = resolveLenisControl(
        (window as unknown as WindowWithLenis).lenis,
      );
    };

    assignLenisControl();

    if (!lenisControlRef.current) {
      const timer = window.setTimeout(assignLenisControl, 250);
      return () => {
        window.clearTimeout(timer);
      };
    }
  }, []);

  const onMouseEnter = () => {
    if (typeof lenisControlRef.current?.stop === 'function') {
      lenisControlRef.current.stop(); // Stop Lenis scrolling when mouse inside chat
    }
  };

  const onMouseLeave = () => {
    if (typeof lenisControlRef.current?.start === 'function') {
      lenisControlRef.current.start(); // Resume Lenis scrolling when mouse leaves chat
    }
  };

  // Prevent wheel event from bubbling to Lenis while allowing native scroll
  const onWheelCapture = (e: React.WheelEvent) => {
    if (viewportRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
      const delta = e.deltaY;
      // Check if can scroll in wheel direction
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop + clientHeight < scrollHeight;

      if ((delta < 0 && canScrollUp) || (delta > 0 && canScrollDown)) {
        e.stopPropagation();
        // keep native scroll
      }
      // If chat can't scroll further, allow Lenis/page scroll to happen
    }
  };

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative overscroll-contain', className)}
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        ref={viewportRef}
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        style={{ overflowY: 'auto', scrollBehavior: 'smooth' }}
        onWheelCapture={onWheelCapture} // capture wheel before Lenis
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
