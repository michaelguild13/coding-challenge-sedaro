import { DataPoint, getSimulation, PlottedAgentData, postSimulation } from "Api";
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
  setCurrentTimeIndex: (newState: number) => void
  isLoading: boolean,
  timeMax: number;
  timeCurrent: number;
  isPlaying: boolean
  simulationData: SimulationData | undefined;
  plotData: ReturnType<typeof getPlotData> | undefined;
  currentPlotData: ReturnType<typeof getCurrentPlotData> | null;
}

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [simulationData, setSimulationData] = useState<SimulationData | undefined>(undefined);
  const [plotData, setPlotData] = useState<ReturnType<typeof getPlotData> | undefined>(undefined)
  // play state
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentPlotData, setCurrentPlotData] = useState<ReturnType<typeof getCurrentPlotData> | null>(null);
  const [playInterval, setPlayInterval] = useState<number | null>(null);

  const isPlaying = !!playInterval
  const timeMax = simulationData?.timePoints.length || 0
  const timeCurrent = currentTimeIndex
  
  const setDataState = (data: DataPoint[]) => {
    const processedData = processData(data);
      setSimulationData(processedData);
      setPlotData(getPlotData(processedData))
      setCurrentPlotData(getCurrentPlotData({data: processedData, currentTimeIndex}))
      setIsLoading(false)
  }

  const getSimulationData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getSimulation();
      setDataState(data)
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false)
    }
  }, [isLoading]);

  const newSimulation = useCallback( async (formData: any) => {
    setIsLoading(true)
    try {
      const data = await postSimulation(formData);
      setDataState(data) 
    } catch (error) {
      console.error("Error posting data:", error);
      setIsLoading(false)
    }
  }, [isLoading]);

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

  

  const reset = useCallback(() => {
      setCurrentTimeIndex(0);
  }, [])

  const next = useCallback(() => {
    if (simulationData?.timePoints) {
      setCurrentTimeIndex((prev) => (prev + 1) % timeMax);
    }
  }, [simulationData]);

  const previous = useCallback(() => {
    if (simulationData?.timePoints) {
      setCurrentTimeIndex((prev) => (prev > 0 ? prev - 1 : timeMax - 1));
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
      previous,
      timeMax,
      timeCurrent,
      setCurrentTimeIndex,
      isLoading
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
      previous,
      timeMax,
      timeCurrent,
      setCurrentTimeIndex,
      isLoading
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
