import './App.css';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import { AuthProvider } from './components/context/AuthContext';
import AuthPage from "./components/AuthPage";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MyBlogs from './components/MyBlogs';
import DetailBlog from "./components/DetailBlog";
import CreateBlog from "./components/CreateBlog";
import EditBlog from './components/EditBlog';
import ProtectedRoutes from './components/context/ProtectedRoutes';
import Hero from "./components/Hero";
import  { Toaster } from 'react-hot-toast';

import { useEffect, useState } from 'react';

// function AppWrapper() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

function App() {
  // const location = useLocation();

  return (
    <AuthProvider>
      <div className="bg-[url(/images/bg.svg)] min-h-screen h-full w-full bg-cover bg-center bg-no-repeat z-0 bg-blend-darker bg-[#7e8081]">
        <Navbar />

    
         {/* {location.pathname === "/" && <Hero />} */}
         <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#363636", color: "#fff" },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

        <Routes>
          <Route path="/" element={<><Hero/><Blogs /></>} />
          <Route path="/myblog" element={<MyBlogs />} />
          <Route path="/detail/:id" element={
            <ProtectedRoutes>
              <DetailBlog />
            </ProtectedRoutes>} />
          <Route path="/create" element={
            <ProtectedRoutes>
              <CreateBlog />
            </ProtectedRoutes>} />
          <Route path="/myblogs" element={
            <ProtectedRoutes>
              <MyBlogs />
            </ProtectedRoutes>} />
          <Route path="/edit/:id" element={
            <ProtectedRoutes>
              <EditBlog />
            </ProtectedRoutes>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
