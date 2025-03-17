import { Box, Flex, Text, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "routes";
import App from "./App";
import "./index.css";
import NotFound from "./NotFound";
import SimulateForm from "./SimulateForm";
import Logo from './assets/sedaroLogo.png';
import { SimulationProvider } from "./context/Simulation";

const router = createBrowserRouter([
  {
    path: Routes.FORM,
    element: <SimulateForm />,
    errorElement: <NotFound />,
  },
  {
    path: Routes.SIMULATION,
    element: <App />,
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
        <Flex style={{ height:'64px',backgroundColor: '#4c68bc', padding: '8px'}} >
          <Box>
            <img src={Logo} alt="Sedaro - Orbit Simulator" style={{height: '100%'}}/>
          </Box>
          <Box style={{margin: 'auto 10px'}}>
            <Text size={'6'}>Orbital Simulation</Text>
          </Box>
        </Flex>
        <RouterProvider router={router} />
      </SimulationProvider>
    </Theme>
  </React.StrictMode>
);
