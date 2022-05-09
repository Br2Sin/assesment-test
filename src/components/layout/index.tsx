import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./footer";
import Header from "./header";

export interface LayoutParam {
  title: string;
  children: any;
}

const Layout = (props: LayoutParam) => {
  const { title, children } = props;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-app-black">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="bg-slate-400 flex-1 z-0">
        <div className="container mx-auto py-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
