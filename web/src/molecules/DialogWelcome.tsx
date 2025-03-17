import { Box, Card, Heading, Separator, Text } from "@radix-ui/themes";
import { DialogSimple } from "./DialogSimple";

export const DialogWelcome = () => {
  return (
    <DialogSimple buttonLabel="About" headingLabel="Welcome!" open={true}>
      <Box>
        <Text as="p" size="3" mb="3">
          This interactive tool allows you to visualize and explore orbital
          mechanics in a 3D environment. You can observe how celestial bodies
          interact through gravitational forces in space.
        </Text>

        <Separator size="4" my="3" />

        <Heading size="4" mb="2">
          What are Orbital Simulators?
        </Heading>
        <Text as="p" size="2" mb="3">
          Orbital simulators are specialized tools that model the motion of
          objects in space according to physical laws, primarily Newton's law of
          universal gravitation and Kepler's laws of planetary motion.
        </Text>
        <Card>
          <Heading size="4" mb="2">
            Key Features
          </Heading>
          <Text as="p" size="2" mb="1">
            • <strong>Run New Simulations:</strong> Generate and explore
            different orbital scenarios
          </Text>
          <Text as="p" size="2" mb="1">
            • <strong>Player Controls:</strong> Play, pause, reset, and step
            through the simulation frame by frame
          </Text>
          <Text as="p" size="2" mb="1">
            • <strong>Toggle Controls:</strong> Show or hide velocity vectors
            and other supplementary data
          </Text>
          <Text as="p" size="2" mb="3">
            • <strong>Interactive Visualization:</strong> Rotate, zoom, and pan
            the 3D view using your mouse
          </Text>
        </Card>
      </Box>
    </DialogSimple>
  );
};
