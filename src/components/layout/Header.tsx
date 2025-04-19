
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, CreditCard, MapPin, LogOut } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-transit-blue cursor-pointer" onClick={() => navigate("/")}>
              YatraPay
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-transit-blue"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-transit-blue"
                  onClick={() => navigate("/card")}
                >
                  My Card
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-transit-blue"
                  onClick={() => navigate("/booking")}
                >
                  Book Ticket
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-transit-blue"
                  onClick={() => navigate("/live-tracking")}
                >
                  Live Tracking
                </Button>
                <div className="flex items-center space-x-2 pl-6 border-l">
                  <span className="font-medium text-transit-blue">₹{user?.cardBalance}</span>
                  <Button 
                    variant="outline" 
                    className="border-transit-teal text-transit-teal hover:bg-transit-teal hover:text-white"
                    onClick={() => navigate("/card")}
                  >
                    Recharge
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-1" /> Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-transit-blue"
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-transit-blue"
                  onClick={() => navigate("/about")}
                >
                  About
                </Button>
                <Button 
                  className="bg-transit-blue hover:bg-blue-700 text-white ml-4"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg absolute w-full z-20">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {isAuthenticated ? (
              <>
                <div className="py-3 border-b flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Welcome back</div>
                    <div className="font-medium">{user?.name}</div>
                  </div>
                  <div className="text-xl font-bold text-transit-blue">₹{user?.cardBalance}</div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3"
                  onClick={() => {
                    navigate("/dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 mr-2" /> Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3"
                  onClick={() => {
                    navigate("/card");
                    setMobileMenuOpen(false);
                  }}
                >
                  <CreditCard className="h-5 w-5 mr-2" /> My Card
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3"
                  onClick={() => {
                    navigate("/booking");
                    setMobileMenuOpen(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16l2 3h14l2-3" />
                  </svg>
                  Book Ticket
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3"
                  onClick={() => {
                    navigate("/live-tracking");
                    setMobileMenuOpen(false);
                  }}
                >
                  <MapPin className="h-5 w-5 mr-2" /> Live Tracking
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3 text-red-500 hover:text-red-600"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3"
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3"
                  onClick={() => {
                    navigate("/about");
                    setMobileMenuOpen(false);
                  }}
                >
                  About
                </Button>
                <div className="pt-2 flex flex-col space-y-2">
                  <Button 
                    className="w-full bg-transit-blue hover:bg-blue-700 text-white"
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-transit-teal hover:bg-teal-600 text-white"
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Create Account
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
