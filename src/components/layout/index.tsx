import React from "react";
import { Helmet } from "react-helmet";

export interface LayoutParam {
  title: string;
  children: any;
}

const Layout = (props: LayoutParam) => {
  const { title, children } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="bg-slate-400">
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
};

export default Layout;
