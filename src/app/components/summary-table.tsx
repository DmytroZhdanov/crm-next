import { ReactNode } from "react";

export interface SummaryTableProps {
  headers: ReactNode;
  children?: ReactNode;
}

export default function SummaryTable({
  headers,
  children,
}: Readonly<SummaryTableProps>) {
  return (
    <table className="table-auto w-full border-separate border-spacing-0">
      <thead>
        <tr>{headers}</tr>
      </thead>

      <tbody className="[&>tr:nth-child(2n)]:bg-gray-100 [&>tr:nth-child(2n+1)]:bg-white">
        {children}
      </tbody>
    </table>
  );
}
