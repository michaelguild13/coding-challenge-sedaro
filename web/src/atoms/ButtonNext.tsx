import { Button } from "@radix-ui/themes";
import { useSimulationContext } from "context/Simulation";

export const ButtonNext = () => {
  const { next } = useSimulationContext();
  return <Button onClick={next}>{">"}</Button>;
};
