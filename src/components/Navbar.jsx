import { useState } from "react";
import { NavLink, Link } from "react-router";

const Navbar = ({ onRandomRecipe }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl transition-transform group-hover:scale-110 group-hover:rotate-12 duration-200">
              🍳
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Recipe Finder
              </span>
              <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-widest -mt-1">
                Powered by TheMealDB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition duration-150 ${
                    isActive
                      ? "bg-amber-500 text-white shadow-sm font-semibold"
                      : "text-gray-700 hover:text-amber-600 hover:bg-orange-50/80"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {onRandomRecipe && (
              <button
                onClick={onRandomRecipe}
                className="ml-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow hover:shadow-md transition active:scale-95"
                title="Get a random recipe"
              >
                <span>🎲</span> Random Recipe
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {onRandomRecipe && (
              <button
                onClick={onRandomRecipe}
                className="text-xs bg-amber-500 text-white p-2 rounded-lg"
                title="Random Recipe"
              >
                🎲
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-orange-50 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white/95 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium transition ${
                  isActive
                    ? "bg-amber-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-orange-50 hover:text-amber-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
