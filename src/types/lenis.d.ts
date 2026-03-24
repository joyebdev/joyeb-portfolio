declare module 'lenis/react' {
  import type { Lenis as LenisType } from 'lenis';
  import type { ReactNode } from 'react';

  export interface ReactLenisProps {
    children?: ReactNode;
    root?: boolean;
    options?: Partial<LenisType>;
  }

  export default function ReactLenis(props: ReactLenisProps): JSX.Element;
}
