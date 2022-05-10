import React from "react";
import { withCookies } from "react-cookie";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./home-page";
import ManagePage from "./manage-page";

const Pages = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage" element={<ManagePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default withCookies(Pages);
