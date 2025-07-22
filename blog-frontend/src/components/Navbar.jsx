import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlignJustify, DiamondPlus } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
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
            {user && (
              <>
                <li
                  className="cursor-pointer hover:underline transition-all duration-300"
                  onClick={() => navigate("/myblogs")}
                >
                  MyBlogs
                </li>
                <li
                  className="cursor-pointer hover:underline transition-all duration-300"
                  onClick={() => navigate("/create")}
                >
                  Create
                </li>
                <li className="font-semibold">{user.username}</li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:underline hover:text-red-300 transition-all duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <button
                  onClick={() => navigate("/auth")}
                  className="hover:underline hover:text-[#A27B5C] transition-all duration-300 cursor-pointer"
                >
                  Login
                </button>
              </li>
            )}
          </ul>

          <div className="md:hidden">
            <AlignJustify
              size={28}
              className="text-[#2C3639] cursor-pointer hover:scale-105"
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
              {user ? (
                <>
                  <li
                    onClick={() => {
                      navigate("/myblogs");
                      setMobileOpen(false);
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
                  <li className="font-semibold">
                    {" "}
                    {`Hello ,${user.username}`}
                  </li>
                  <li
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-red-400"
                  >
                    Logout
                  </li>
                </>
              ) : (
                <li
                  onClick={() => {
                    navigate("/auth");
                    setMobileOpen(false);
                  }}
                  className="cursor-pointer hover:underline"
                >
                  Login
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
