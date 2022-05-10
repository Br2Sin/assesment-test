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
      <main className="bg-slate-400 flex-1 z-10">
        <div className="container mx-auto py-4">{children}</div>
      </main>
      <Footer />
      <div className="bg-app-red bg-opacity-70 rounded-full w-full md:w-500 h-500 absolute z-0 top-0 left-0 -translate-x-1/3 -translate-y-1/3 transform"></div>
      <div className="bg-gray-400 rounded-full h-32 w-32 absolute right-10 top-10 z-0"></div>
      <div className="bg-app-red rounded-full h-12 w-12 absolute right-5 top-44" ></div>
    </div>
  );
};

export default Layout;
