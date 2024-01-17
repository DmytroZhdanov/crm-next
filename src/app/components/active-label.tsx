import { ReactNode } from "react";
import styles from "./active-label.module.css";

export interface ActiveLabelProps {
  children: ReactNode;
}

console.log(styles);
export default function ActiveLabel({ children }: Readonly<ActiveLabelProps>) {
  return <span className={styles.label}>{children}</span>;
}
