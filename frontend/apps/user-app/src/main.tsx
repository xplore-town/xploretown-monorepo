import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignIn from "./pages/SignIn.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google"; //

// Access env variable in Vite
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "signin", element: <SignIn /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
