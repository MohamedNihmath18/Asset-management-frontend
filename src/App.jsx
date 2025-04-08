
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AddAsset from "./pages/AddAsset";
import EditAsset from "./pages/EditAsset";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AssetList from "./pages/AssetList";
import AssetDetails from "./pages/AssetDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-6">
          <Routes>
            {/* Login Page (No Authentication Needed) */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
            <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
            <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
            <Route path="/warranty-ppm" element={<WarrantyPPM />} />
            <Route path="/service-report" element={<ServiceReport />} />


            {/* Redirect Unknown Routes to Login */}
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
