
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import AddAsset from "./pages/AddAsset";
// import EditAsset from "./pages/EditAsset";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import AssetList from "./pages/AssetList";
// import AssetDetails from "./pages/AssetDetails";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Warranty from "./pages/Warranty";
// import ServiceReport from "./pages/ServiceReport";
// import Ppm from "./pages/Ppm";
// import Sidebar from "./pages/Sidebar";

// function App() {
//   return (
// //     <Router>
// //       <div className="min-h-screen bg-gray-100">
// //         <Navbar />
// //         <div className="container mx-auto p-6">
// //           <Routes>
// //             {/* Login Page (No Authentication Needed) */}
// //             <Route path="/login" element={<Login />} />

// //             {/* Protected Routes */}
// //             <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
// //             <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
// //             <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
// //             <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
// //             <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
// //             <Route path="/warranty" element={<Warranty />} />
// //             <Route path="/service-report" element={<ServiceReport />} />
// //             <Route path="/ppm" element={<Ppm />} />


// //             {/* Redirect Unknown Routes to Login */}
// //             <Route path="*" element={<Login />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }
// <Router>
//       <div className="min-h-screen flex flex-col">
//         {/* Navbar stays on top */}
//         <Navbar />

//         {/* Main layout: sidebar + content */}
//         <div className="flex flex-1">
//           <Sidebar />

//           <main className="flex-1 bg-gray-100 p-6">
//             <Routes>
//               {/* Login Page (No Authentication Needed) */}
//               <Route path="/login" element={<Login />} />

//               {/* Protected Routes */}
//               <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//               <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
//               <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
//               <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
//               <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
//               <Route path="/warranty" element={<Warranty />} />
//               <Route path="/service-report" element={<ServiceReport />} />
//               <Route path="/ppm" element={<Ppm />} />

//               {/* Redirect Unknown Routes to Login */}
//               <Route path="*" element={<Login />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Login from "./components/Login";
// import AddAsset from "./pages/AddAsset";
// import EditAsset from "./pages/EditAsset";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import AssetList from "./pages/AssetList";
// import AssetDetails from "./pages/AssetDetails";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Warranty from "./pages/Warranty";
// import ServiceReport from "./pages/ServiceReport";
// import Ppm from "./pages/Ppm";
// import Sidebar from "./pages/Sidebar";
// import BulkUpload from "./pages/BulkUpload";




// function Layout() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login"; // Check if current route is login

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar stays on top */}
//       <Navbar />

//       {/* Main layout: sidebar + content */}
//       <div className="flex flex-1">
//         {/* Only show Sidebar if not on the login page */}
//         {!isLoginPage && <Sidebar />}

//        <main className={`flex-1 bg-gray-100 p-6 pt-20 ${!isLoginPage ? 'ml-64' : ''}`}>


//         {/* <main className="ml-16 md:ml-64 transition-all duration-300 p-4"> */}
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
//             <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
//             <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
//             <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
//             <Route path="/bulk-upload" element={<ProtectedRoute><BulkUpload /></ProtectedRoute>} />
//             <Route path="/warranty" element={<Warranty />} />
//             <Route path="/service-report" element={<ServiceReport />} />
//             <Route path="/ppm" element={<Ppm />} />
//             <Route path="*" element={<Login />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AddAsset from "./pages/AddAsset";
import EditAsset from "./pages/EditAsset";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AssetList from "./pages/AssetList";
import AssetDetails from "./pages/AssetDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Warranty from "./pages/Warranty";
import ServiceReport from "./pages/ServiceReport";
import Ppm from "./pages/Ppm";
import Sidebar from "./pages/Sidebar";
import BulkUpload from "./pages/BulkUpload";




function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Check if current route is login

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main layout: sidebar + content */}
      <div className="flex flex-1">
        {/* Only show Sidebar if not on the login page */}
        {!isLoginPage && <Sidebar />}

        <main className="flex-1 bg-gray-100 p-6 ">
        {/* <main className="ml-16 md:ml-64 transition-all duration-300 p-4"> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
            <Route path="/edit-asset/:id" element={<ProtectedRoute><EditAsset /></ProtectedRoute>} />
            <Route path="/asset/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
            <Route path="/bulk-upload" element={<ProtectedRoute><BulkUpload /></ProtectedRoute>} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/service-report" element={<ServiceReport />} />
            <Route path="/ppm" element={<Ppm />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
