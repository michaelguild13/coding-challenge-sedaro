import { Button } from "@radix-ui/themes";
import { useSimulationContext } from "context/Simulation";

export const ButtonPrevious = () => {
  const { previous } = useSimulationContext();
  return <Button onClick={previous}>{"<"}</Button>;
};
