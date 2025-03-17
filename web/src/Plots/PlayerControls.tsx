import { Box, Flex } from "@radix-ui/themes";
import { ButtonNext } from "atoms/ButtonNext";
import { ButtonPlay } from "atoms/ButtonPlay";
import { ButtonPrevious } from "atoms/ButtonPrevious";
import { ButtonReset } from "atoms/ButtonReset";
import { SliderTimeline } from "atoms/SliderTimeline";

export const PlayerControls = () => {
  return (
    <Box>
        <Flex direction="row" align="center" gap={'6px'}>
          <ButtonPlay />
          <ButtonReset />
          <ButtonPrevious />
          <ButtonNext />
          <SliderTimeline />
        </Flex>
      </Box>
  );
};
