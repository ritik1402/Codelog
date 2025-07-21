import React from 'react';
import { SendHorizontal } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer border-t-2 p-6 md:p-8 mt-8">
      <div className="max-w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="w-full md:w-[40%] flex justify-center md:justify-start">
          <form className="flex relative w-full h-10 bg-white rounded-lg items-center">
            <input
              type="text"
              placeholder="Send us a message"
              className="w-full p-2 border-2 border-gray-400 rounded-lg pr-12"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-300">
              <SendHorizontal />
            </button>
          </form>
        </div>

        <div className="w-full md:w-[60%] flex flex-col sm:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <h2 className="text-md font-bold">Join Our</h2>
            <ul className="text-sm space-y-1">
              <li>
                <a>Privacy</a>
              </li>
              <li>
                <a>Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-center sm:text-left">
            <h2 className="text-md font-bold">Follow Us</h2>
            <ul className="text-sm space-y-1">
              <li>
                <a>Facebook</a>
              </li>
              <li>
                <a>Twitter</a>
              </li>
              <li>
                <a>Instagram</a>
              </li>
              <li>
                <a>LinkedIn</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-center sm:text-left">
            <h2 className="text-md font-bold">Join our</h2>
            <ul className="text-sm space-y-1">
              <li>Newsletter</li>
              <li>Community</li>
              <li>Discord</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-center text-sm text-black-500">
          Copyright &copy; {year} All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
