import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OAuthCallback from './components/OAuthCallback/OAuthCallback';
import ErrorNotFound from './components/ErrorNotFound/ErrorNotFound';

import './App.css';
import './styles/globals.scss';

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
