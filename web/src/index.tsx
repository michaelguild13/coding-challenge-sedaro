import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "routes";
import App from "./screens/App";
import "./index.css";
import NotFound from "./screens/NotFound";
import { SimulationProvider } from "./context/Simulation";
import { HeaderNavigation } from "molecules/HeaderNavigation";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <App />,
    errorElement: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    {/* Theme: https://www.radix-ui.com/themes/docs/theme/overview */}
    <Theme
      appearance="dark"
      accentColor="iris"
      grayColor="mauve"
      radius="small"
    >
      <SimulationProvider>
        <HeaderNavigation/>
        <RouterProvider router={router} />
      </SimulationProvider>
    </Theme>
  </React.StrictMode>
);
