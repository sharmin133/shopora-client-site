import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import CartModal from '../pages/ProductDetails/CartModal';
import Footer from '../components/Footer/Footer';

const Root = () => {
    return (
              <>
      <Navbar />
      <main className="mt-16">
        <CartModal></CartModal>
        <Outlet />
      </main>
<Footer></Footer>
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