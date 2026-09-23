import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import CheckOut from './pages/CheckOut';
import Success from './assets/Success';
import Cancel from './assets/Cancel';



function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/landing" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/landing" />} />
        <Route path="/landing" element={user ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/success" element={<Success />}/>
        <Route path="/cancel" element={<Cancel />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;