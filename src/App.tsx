import React, { Suspense } from 'react';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import Pages from './pages';
require('dotenv').config()

function App() {
  return (
    <CookiesProvider>
      <Suspense>
        <Pages />
      </Suspense>
    </CookiesProvider>
  );
}

export default App;
