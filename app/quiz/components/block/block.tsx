'use client';

import styles from './block.module.css';

interface Props {
  children: React.ReactNode;
  maxWidth?: number;
}

export function Container({ children, maxWidth = 400 }: Props): JSX.Element {
  return (
    <article className={styles.block} style={{ maxWidth }}>
      {children}
    </article>
  );
}
export default Container;
