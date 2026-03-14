'use client';

import { navbarConfig } from '@/config/Navbar';
import { Menu, X } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { Button } from '../ui/button';

export default function Navbar(): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Container className="sticky top-0 z-20 rounded-md py-3 backdrop-blur-sm sm:py-4">
      <div className="flex items-center justify-between gap-2 px-2 sm:px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link href="/" aria-label="Go to homepage" onClick={closeMobileMenu}>
            <Image
              className="h-10 w-10 shrink-0 rounded-md border border-gray-200 bg-blue-300 transition-all duration-300 ease-in-out hover:scale-90 sm:h-12 sm:w-12 dark:bg-yellow-300"
              src={navbarConfig.logo.src}
              alt={navbarConfig.logo.alt}
              width={navbarConfig.logo.width}
              height={navbarConfig.logo.height}
              priority
              sizes="(max-width: 768px) 40px, 48px"
            />
          </Link>
          <div className="hidden min-w-0 flex-wrap items-center gap-x-2 gap-y-1 md:flex md:gap-4">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="inline-flex min-h-11 items-center text-sm transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4 sm:text-base"
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggleButton variant="circle" start="top-right" blur />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 md:hidden"
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navbar-menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navbar-menu"
          className="mt-3 border-t border-border px-2 pt-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="inline-flex min-h-11 items-center rounded-md px-2 text-sm transition-colors hover:bg-muted"
                key={`${item.label}-mobile`}
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </Container>
  );
}
