import { DataPoint, getSimulation, PlottedAgentData } from "Api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { processPositionVelocityData } from "utilities";

const SimulationContext = createContext<any | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  // Raw Simulation Data
  const [simulationData, setSimulationData] = useState<DataPoint[]>([]);
  // Plot Data
  const [positionData, setPositionData] = useState<PlottedAgentData[]>([]);
  const [velocityData, setVelocityData] = useState<PlottedAgentData[]>([]);

  const getSimulationData = async () => {
    try {
      const data = await getSimulation();
      setSimulationData(data);

      const [updatedPositionData, updatedVelocityData] =
        processPositionVelocityData(data);

      setPositionData(updatedPositionData);
      setVelocityData(updatedVelocityData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const newSimulation = (newState: any) => {};

  useEffect(() => {
    //TODO: update react version from 18. Due to React 18's Strict Mode, this will only run twice
    getSimulationData();
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        simulationData,
        newSimulation,
        positionData,
        velocityData,
        getSimulationData,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

// Custom hook to use the context
export const useSimulationContext = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error(
      "useSimulationContext must be used within a SimulationProvider"
    );
  }
  return context;
};
