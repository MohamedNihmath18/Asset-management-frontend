import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react"; // Added LogOut icon
import mahsaLogo from "../assets/mahsa-logo.png";

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
    <nav className="text-blue-800 p-4 shadow-md" style={{ backgroundColor: 'oklch(71.5% 0.143 215.221)' }}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        {/* <Link to="/" className="text-xl font-bold">MSH ASSET MANAGEMENT SYSTEM</Link> */}

        <Link to="/" className="flex items-center space-x-3">
          <img src={mahsaLogo} alt="Mahsa Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">MSH ASSET MANAGEMENT SYSTEM</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {isLoggedIn && (
            <>
              <Link to="/" className="hover:underline"><strong>Home</strong></Link>
              <Link to="/add" className="hover:underline"><strong>Add Asset</strong></Link>
              
              {/* Styled Logout Button */}
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 flex items-center gap-2 rounded-lg shadow-lg transition duration-200"
              >
                <LogOut size={18} /> Logout
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
              
              {/* Styled Mobile Logout Button */}
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 flex items-center justify-center gap-2 rounded-lg shadow-lg transition duration-200"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


 