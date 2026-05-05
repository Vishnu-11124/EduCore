
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
 import { ClerkProvider } from "@clerk/clerk-react";

// const PUBLISHABLE_KEY = "pk_test_d2lubmluZy1tYXN0b2Rvbi02NS5jbGVyay5hY2NvdW50cy5kZXYk";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("ENV FULL:", import.meta.env);
console.log("CLERK KEY:", PUBLISHABLE_KEY);
createRoot(document.getElementById("root")).render(
  

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ClerkProvider>

);
