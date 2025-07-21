import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import AuthPage from "./AuthPage";
import { useNavigate } from "react-router-dom";
import { AlignJustify, DiamondPlus } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  // const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <>
      <div className="text-[#DCD7C9] px-6 z-50 relative">
        <div className="flex justify-between items-center py-4">
          <h1
            className="text-3xl font-bold text-black cursor-pointer"
            onClick={() => navigate("/")}
          >
            Codelog
          </h1>

          <ul className="hidden md:flex gap-6 text-lg text-[#A27B5C] items-center">
            <li
              className="cursor-pointer hover:scale-125 transition"
              onClick={() => navigate("/myblogs")}
            >
              MyBlogs
            </li>
            <li
              className="cursor-pointer hover:scale-125 transition"
              onClick={() => navigate("/create")}
            >
              Create
            </li>
            {user ? (
              <>
                <li className="font-semibold">{user.username}</li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:text-red-300 transition hover:scale-125"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => navigate("/auth")}
                  className="hover:text-[#A27B5C] transition hover:scale-125"
                >
                  Login
                </button>
              </li>
            )}
          </ul>

          <div className="md:hidden">
            <AlignJustify
              size={28}
              className="text-[#2C3639] cursor-pointer"
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>

        
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex justify-end">
          <div className="w-[75%] sm:w-[60%] bg-[#212121] p-6 space-y-4 relative">
            <button
              className="absolute top-4 right-4 text-red-400 hover:text-red-600"
              onClick={() => setMobileOpen(false)}
            >
              <DiamondPlus size={28} />
            </button>

            <ul className="flex flex-col gap-4 text-[#A27B5C] text-lg">
              <li
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/auth");
                }}
                className="cursor-pointer hover:underline"
              >
                MyBlogs
              </li>
              <li
                onClick={() => {
                  navigate("/create");
                  setMobileOpen(false);
                }}
                className="cursor-pointer hover:underline"
              >
                Create
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-white text-3xl hover:text-red-400"
            >
              <DiamondPlus size={28} />
            </button>
          </div>
          <AuthPage />
        </div>
      )} */}
    </>
  );
};

export default Navbar;
