import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateAPI from "./pages/CreateAPI";
import EditAPI from "./pages/EditAPI";
import ForgotPassword from "./pages/ForgotPassword"; // ✅ Added this!

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Working link! */}

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateAPI /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditAPI /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
