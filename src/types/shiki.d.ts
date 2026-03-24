declare module '@shikijs/rehype' {
  import type { Transformer } from 'unified';

  interface ShikiRehypeOptions {
    theme?: string;
    themes?: Record<string, string>;
    langs?: string[];
    defaultColor?: string | boolean;
    cssVariablePrefix?: string;
  }

  export default function rehypeShiki(
    options?: ShikiRehypeOptions
  ): Transformer;
}
