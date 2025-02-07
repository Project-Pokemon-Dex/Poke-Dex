import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import Favorite from "./pages/Favorite";
import FilterPage from "./pages/FilterPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/pokemon/:name",
        element: <DetailPage />,
      },
      {
        path: "/:id",
        element: <FilterPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
