import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './frontend/LandingPage';
import Home from './frontend/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;