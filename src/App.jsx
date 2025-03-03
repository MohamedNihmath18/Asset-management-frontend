
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import AddAsset from "./pages/AddAsset";
// import EditAsset from "./pages/EditAsset";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import AssetList from "./pages/AssetList";
// import AssetDetails from "./pages/AssetDetails";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="container mx-auto p-6">
//           <Routes>
//             {/* Login Page (No Authentication Needed) */}
//             <Route path="/login" element={<Login />} />

//             {/* Protected Routes */}
//             <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
//             <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
//             <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
//             <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />

//             {/* Redirect Unknown Routes to Login */}
//             <Route path="*" element={<Login />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import AddAsset from "./pages/AddAsset";
import EditAsset from "./pages/EditAsset";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AssetList from "./pages/AssetList";
import AssetDetails from "./pages/AssetDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Listen for storage changes (logout/login)
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Show Navbar only when authenticated */}
        {isAuthenticated && <Navbar />}

        <div className="container mx-auto p-4 md:p-6">
          <Routes>
            {/* Public Login Page */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
            <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
            <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />

            {/* Redirect Unknown Routes */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
