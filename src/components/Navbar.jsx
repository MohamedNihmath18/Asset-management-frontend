// // import { Link, useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const navigate = useNavigate();
  
// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // Remove Token
// //     navigate("/login"); // Redirect to login
// //   };

// //   return (
// //     <nav className="bg-blue-600 text-white p-4 shadow-md">
// //       <div className="container mx-auto flex justify-between items-center">
// //         <Link to="/" className="text-xl font-bold">Asset Management System</Link>
// //         <div className="space-x-4">
// //           <Link to="/" className="hover:underline">Home</Link>
// //           <Link to="/add" className="hover:underline">Add Asset</Link>
// //           <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setIsLoggedIn(!!localStorage.getItem("token")); // Update state if token exists
//     };

//     window.addEventListener("storage", checkLoginStatus); // Listen for storage changes
//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, []);

//   useEffect(() => {
//     // This will make sure state updates immediately after login
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [localStorage.getItem("token")]); // ✅ React will update when token changes

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">Asset Management System</Link>
//         <div className="space-x-4">
//           {isLoggedIn ? (
//             <>
//               <Link to="/" className="hover:underline">Home</Link>
//               <Link to="/add" className="hover:underline">Add Asset</Link>
//               <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
//             </>
//           ) : null}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // For mobile menu icons

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold">Asset Management System</Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {isLoggedIn && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/add" className="hover:underline">Add Asset</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white flex flex-col p-4 mt-2 rounded-lg space-y-2">
          {isLoggedIn && (
            <>
              <Link to="/" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/add" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Add Asset</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

