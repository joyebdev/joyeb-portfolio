import { cn } from '@/lib/utils';
import { getTechIcon } from '@/utils/techIcons';

interface TechStackPillsProps {
  items: string[];
  className?: string;
}

export function TechStackPills({ items, className }: TechStackPillsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1',
        className,
      )}
      aria-label="Tech stack"
    >
      {items.map((tech) => {
        const Icon = getTechIcon(tech);
        return (
          <span
            key={tech}
            className="inline-flex max-w-full items-center gap-1 text-xs leading-none text-black/50 dark:text-white/60"
          >
            {Icon ? (
              <Icon className="size-3 shrink-0 opacity-90" aria-hidden />
            ) : null}
            <span className="truncate">{tech}</span>
          </span>
        );
      })}
    </div>
  );
}
