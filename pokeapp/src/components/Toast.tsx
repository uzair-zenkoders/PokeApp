// React Imports
import React, { FC } from "react";

// React Toastify Imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastProps {}

const Toast: FC<IToastProps> = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
