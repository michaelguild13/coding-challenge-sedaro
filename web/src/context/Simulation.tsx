import { DataPoint, getSimulation, PlottedAgentData } from "Api";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getCurrentPlotData, getPlotData, processData, SimulationData } from "utilities";


interface SimulationContextType {
  newSimulation: (newState: any) => void;
  getSimulationData: () => Promise<void>;
  togglePlay: () => void;
  reset: () => void;
  next: () => void;
  previous:() => void;
  isPlaying: boolean
  simulationData: SimulationData | undefined;
  plotData: ReturnType<typeof getPlotData> | undefined;
  currentPlotData: ReturnType<typeof getCurrentPlotData> | null;
}

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [simulationData, setSimulationData] = useState<SimulationData | undefined>(undefined);
  const [plotData, setPlotData] = useState<ReturnType<typeof getPlotData> | undefined>(undefined)
  // play state
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentPlotData, setCurrentPlotData] = useState<ReturnType<typeof getCurrentPlotData> | null>(null);
  const [playInterval, setPlayInterval] = useState<number | null>(null);
  
  const getSimulationData = useCallback(async () => {
    try {
      const data = await getSimulation();
      const processedData = processData(data);
      setSimulationData(processedData);
      setPlotData(getPlotData(processedData))
      setCurrentPlotData(getCurrentPlotData({data: processedData, currentTimeIndex}))
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const newSimulation = useCallback((newState: any) => {
    // Placeholder for newSimulation logic
  }, []);

  const togglePlay = useCallback(() => {
    if (playInterval) {
      clearInterval(playInterval);
      setPlayInterval(null);
    } else {
      // Immediately advance to the next frame for instant feedback
      if (simulationData?.timePoints) {
        setCurrentTimeIndex((prev) => 
          (prev + 1) % simulationData.timePoints.length
        );
      }
      
      // Then set up the interval for continued playback
      const interval = setInterval(() => {
        setCurrentTimeIndex((prev) => 
          simulationData?.timePoints 
            ? (prev + 1) % simulationData.timePoints.length 
            : prev
        );
      }, 100);
      
      setPlayInterval(interval);
    }
  }, [playInterval, simulationData]);

  const isPlaying = !!playInterval

  const reset = useCallback(() => {
      setCurrentTimeIndex(0);
  }, [])

  const next = useCallback(() => {
    if (simulationData?.timePoints) {
      setCurrentTimeIndex((prev) => (prev + 1) % simulationData.timePoints.length);
    }
  }, [simulationData]);

  const previous = useCallback(() => {
    if (simulationData?.timePoints) {
      setCurrentTimeIndex((prev) => (prev > 0 ? prev - 1 : simulationData.timePoints.length - 1));
    }
  }, [simulationData]);

  const contextValue = useMemo(
    () => ({
      simulationData,
      newSimulation,
      getSimulationData,
      plotData,
      currentPlotData,
      isPlaying,
      togglePlay,
      reset,
      next,
      previous
    }),
    [
      simulationData,
      newSimulation,
      getSimulationData,
      plotData,
      currentPlotData,
      isPlaying,
      togglePlay,
      reset,
      next,
      previous
    ]
  );

  useEffect(() => {
    //TODO: update react version from 18. Due to React 18's Strict Mode, this will only run twice
    getSimulationData();
  }, []);

  useEffect(() => {
    return () => {
      if (playInterval) {
        clearInterval(playInterval);
      }
    };
  }, [playInterval]);
  
  useEffect(() => {
    if (!simulationData) return
    setCurrentPlotData(getCurrentPlotData({data: simulationData, currentTimeIndex}))
  }, [currentTimeIndex])

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
