import { ReactNode } from "react";
import styles from "./not-active-label.module.css";

export interface NotActiveLabelProps {
  children: ReactNode;
}

export default function NotActiveLabel({
  children,
}: Readonly<NotActiveLabelProps>) {
  return <span className={styles.label}>{children}</span>;
}
