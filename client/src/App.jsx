import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
   
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       
      </Routes>
      </>
    
  );
}

export default App;