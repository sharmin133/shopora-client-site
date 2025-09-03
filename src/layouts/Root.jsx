import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
              <>
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>

<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
           
    );
};

export default Root;