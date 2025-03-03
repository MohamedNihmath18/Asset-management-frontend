// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
  
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove Token
//     navigate("/login"); // Redirect to login
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">Asset Management System</Link>
//         <div className="space-x-4">
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/add" className="hover:underline">Add Asset</Link>
//           <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); // Update state if token exists
    };

    window.addEventListener("storage", checkLoginStatus); // Listen for storage changes
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    // This will make sure state updates immediately after login
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [localStorage.getItem("token")]); // ✅ React will update when token changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Asset Management System</Link>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/add" className="hover:underline">Add Asset</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
