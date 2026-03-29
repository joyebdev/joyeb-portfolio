import type { IconType } from 'react-icons';
import {
  SiCss,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

export const techIcons: Partial<Record<string, IconType>> = {
  Vite: SiVite,
  TypeScript: SiTypescript,
  CSS: SiCss,
  React: SiReact,
  'Next.js': SiNextdotjs,
  JavaScript: SiJavascript,
  Tailwind: SiTailwindcss,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Node: SiNodedotjs,
  Express: SiExpress,
};

export function getTechIcon(tech: string): IconType | undefined {
  return techIcons[tech];
}
