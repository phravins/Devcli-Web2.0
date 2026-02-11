import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import FeaturesPage from './pages/FeaturesPage';
import APIReference from './pages/APIReference';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiesPolicy />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/api" element={<APIReference />} />
    </Routes>
  );
}

export default App;
