import styles from "./container.module.css";

interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <main className={styles.container}>{children}</main>;
}
export default Container;
