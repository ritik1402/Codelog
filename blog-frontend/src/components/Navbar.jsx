import { useAuth } from "./context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlignJustify, DiamondPlus } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setToggle(false);
  };

  const toggleDropDown = () => {
    setToggle((prev) => !prev);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          <div className="hidden md:block relative" ref={dropdownRef}>
            <button onClick={toggleDropDown}>
              <img
                src="./images/user.png"
                alt="User"
                className="rounded-full h-10 w-10 cursor-pointer"
              />
            </button>

            {toggle && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 text-[#2C3639] z-50">
                {user ? (
                  <>
                  <li className="px-4 py-2 font-semibold">{`Hello, ${user.username}`}</li>
                    <li
                      onClick={() => {
                        navigate("/myblogs");
                        setToggle(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer active:text-[#A27B5C]"
                    >
                      MyBlogs
                    </li>
                    <li
                      onClick={() => {
                        navigate("/create");
                        setToggle(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer active:text-[#A27B5C]"
                    >
                      Create
                    </li>
                    
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <li
                    onClick={() => {
                      navigate("/auth");
                      setToggle(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </li>
                )}
              </ul>
            )}
          </div>

         
          <div className="md:hidden">
            <img
              src="./images/user.png"
              className="cursor-pointer rounded-full h-12 w-12"
              onClick={() => setMobileOpen(true)}
              alt="User"
            />
          </div>
        </div>
      </div>

     
      <div
        className={`fixed inset-0 z-50 bg-opacity-80 backdrop-blur-sm flex justify-end transition-opacity duration-300 ease-in-out ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`w-[75%] sm:w-[50%] bg-[#DCD7C9] text-black p-6 space-y-4 relative transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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
                <li className="font-semibold">{`Hello ,${user.username}`}</li>
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
    </>
  );
};

export default Navbar;
