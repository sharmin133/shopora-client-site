import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AuthProvider from "./context/AuthProvider.jsx";
import router from "./routes/Router.jsx";
import { RouterProvider } from "react-router";


createRoot(document.getElementById("root")).render(
 <StrictMode>
    <Provider store={store}>
   
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
    
    </Provider>
  </StrictMode>
);