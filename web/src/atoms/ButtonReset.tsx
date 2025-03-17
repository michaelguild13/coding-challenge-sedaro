import { Button } from "@radix-ui/themes";
import { useSimulationContext } from "context/Simulation";

export const ButtonReset = () => {
  const { reset } = useSimulationContext();
  return <Button onClick={reset}>↺</Button>;
};
