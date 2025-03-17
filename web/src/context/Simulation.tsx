import { DataPoint, getSimulation, PlottedAgentData } from "Api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { processData, processFramesData } from "utilities";
import { Frame as PlotlyFrame } from "plotly.js";

interface SimulationContextType {
  simulationData: DataPoint[];
  newSimulation: (newState: any) => void;
  positionData: PlottedAgentData[];
  velocityData: PlottedAgentData[];
  getSimulationData: () => Promise<void>;
  positionVelocityFrames: PlotlyFrame[];
  framesData: PlottedAgentData[];
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  // Raw Simulation Data
  const [simulationData, setSimulationData] = useState<DataPoint[]>([]);
  // Plot Data
  const [positionData, setPositionData] = useState<PlottedAgentData[]>([]);
  const [velocityData, setVelocityData] = useState<PlottedAgentData[]>([]);
  const [positionVelocityFrames, setPositionVelocityFrames] = useState([]);
  const [framesData, setFramesData] = useState<PlottedAgentData[] | undefined>(undefined);

  const getSimulationData = useCallback(async () => {
    try {
      const data = await getSimulation();
      setSimulationData(data);

      const [updatedPositionData, updatedVelocityData, updatedPositionVelocityFrames] =
        processData(data);
        
      setFramesData(processFramesData(data));
      setPositionData(updatedPositionData);
      setVelocityData(updatedVelocityData);
      setPositionVelocityFrames(updatedPositionVelocityFrames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const newSimulation = useCallback((newState: any) => {
    // Placeholder for newSimulation logic
  }, []);

  const contextValue = useMemo(
    () => ({
      simulationData,
      newSimulation,
      positionData,
      velocityData,
      getSimulationData,
      positionVelocityFrames,
      framesData,
    }),
    [simulationData, newSimulation, positionData, velocityData, getSimulationData, positionVelocityFrames, framesData]
  );

  useEffect(() => {
    //TODO: update react version from 18. Due to React 18's Strict Mode, this will only run twice
    getSimulationData();
  }, [getSimulationData]);

  return (
    <SimulationContext.Provider value={contextValue}>
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
