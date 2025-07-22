import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-screen h-full  bg-no-repeat bg-cover bg-center
 flex items-center justify-center text-[#DCD7C9] px-4">
    
      <div className="bg-[#2C3639] p-8 rounded-xl w-full max-w-md shadow-lg">
        {isLogin ? <Login /> : <Signup />}
        <p className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              Don't have an account ? 
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#A27B5C] hover:underline"
              >
                 Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#A27B5C] hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
