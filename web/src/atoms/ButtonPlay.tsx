import { Button } from "@radix-ui/themes";
import { useSimulationContext } from "context/Simulation";

export const ButtonPlay = () => {
  const { isPlaying, togglePlay } = useSimulationContext();
  return <Button onClick={togglePlay}>{isPlaying ? "❚❚" : "▶"}</Button>;
};
