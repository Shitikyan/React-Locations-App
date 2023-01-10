import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getItem } from './services/localstorage';
import environment from './environment';
import Home from './components/Home';
import OAuthCallback from './components/OAuthCallback/OAuthCallback';
import ErrorNotFound from './components/ErrorNotFound/ErrorNotFound';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="oAuth/oauthcallback" element={<OAuthCallback />} />
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}

export default App;
