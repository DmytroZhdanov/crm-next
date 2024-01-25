import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  header: ReactNode;
  toolbar: ReactNode;
  modal: ReactNode;
}

export default function Layout({
  children,
  header,
  toolbar,
  modal,
}: Readonly<LayoutProps>) {
  return (
    <>
      {modal}
      {header}
      <main>
        {toolbar}
        {children}
      </main>
    </>
  );
}
