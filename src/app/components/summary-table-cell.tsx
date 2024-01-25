import { ReactNode } from "react";
import clsx from "clsx";

export interface SummaryTableCellProps {
  align?: "left" | "center" | "right";
  children: ReactNode;
}

export default function SummaryTableCell({
  align = "left",
  children,
}: Readonly<SummaryTableCellProps>) {
  return (
    <td
      className={clsx(
        "py-2 px-5 text-sm border-gray-100 border-r first-of-type:border-l",
        `text-${align}`,
      )}
    >
      {children}
    </td>
  );
}
