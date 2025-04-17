import { Box, Flex, Text } from "@radix-ui/themes";
import { DialogWelcome } from "./DialogWelcome";
import Logo from './../assets/sedaroLogo.png';

export const HeaderNavigation = () => (
  <Flex style={{ height: "64px", backgroundColor: "#4c68bc", padding: "8px" }}>
    <Box>
      <a href="https://www.sedaro.com/" target="_blank">
      <img
        src={Logo}
        alt="Sedaro - Orbit Simulator"
        style={{ height: "100%" }}
      />
      </a>
    </Box>
    <Box style={{ margin: "auto 10px" }}>
      <Text size={"6"}>Orbital Simulation</Text>
    </Box>
    <Box
      style={{
        marginLeft: "auto",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <DialogWelcome />
    </Box>
  </Flex>
);
