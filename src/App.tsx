import React, { Suspense } from "react";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import Pages from "./pages";
import AppContextProvider from "./contexts/AppContext";
require("dotenv").config();

function App() {
  return (
    <CookiesProvider>
      <AppContextProvider>
        <Suspense>
          <Pages />
        </Suspense>
      </AppContextProvider>
    </CookiesProvider>
  );
}

export default App;
