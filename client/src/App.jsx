import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AI from "./pages/AI";
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
   
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       <Route path="/analytics" element={<Analytics />} />
       <Route path="/ai" element={<AI />} />
      </Routes>
      </>
    
  );
}

export default App;