import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import ContextProvider from "./context/ContextProvider";  // ✅ Ensure this is imported


ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>  {/* ✅ Wrap your app with ContextProvider */}
        <App />
    </ContextProvider>
);
