import { DataPoint, getSimulation } from "Api";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Input data from the simulation
type AgentData = Record<string, Record<string, number>>;
type DataFrame = Record<string, AgentData>;

// Output data to the plot
type PlottedAgentData = Record<string, number[]>;
type PlottedFrame = Record<string, PlottedAgentData>;

const SimulationContext = createContext<any | undefined>(undefined);

const processPositionVelocityData = (
  data: DataPoint[],
): [PlottedAgentData[], PlottedAgentData[]] => {
  const baseData = () => ({
    x: [],
    y: [],
    z: [],
    type: "scatter3d",
    mode: "lines+markers",
    marker: { size: 4 },
    line: { width: 2 },
  });
    const updatedPositionData: PlottedFrame = {};
    const updatedVelocityData: PlottedFrame = {};
    data.forEach(([t0, t1, frame]) => {
        for (let [agentId, val] of Object.entries(frame)) {
            if (agentId == "time" || agentId == "timeStep") {
            continue;
            }
            let {position, velocity} = val;
            updatedPositionData[agentId] = updatedPositionData[agentId] || baseData();
            updatedPositionData[agentId].x.push(position.x);
            updatedPositionData[agentId].y.push(position.y);
            updatedPositionData[agentId].z.push(position.z);

            updatedVelocityData[agentId] = updatedVelocityData[agentId] || baseData();
            updatedVelocityData[agentId].x.push(velocity.x);
            updatedVelocityData[agentId].y.push(velocity.y);
            updatedVelocityData[agentId].z.push(velocity.z);
        }
    });
  return [Object.values(updatedPositionData), Object.values(updatedVelocityData)];
};

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  // Raw Simulation Data
  const [simulationData, setSimulationData] = useState<DataPoint[]>([]);
  // Plot Data
  const [positionData, setPositionData] = useState<PlottedAgentData[]>([]);
  const [velocityData, setVelocityData] = useState<PlottedAgentData[]>([]);

  const getSimulationData = async () => {
    console.log('getting simulation data from context')
    try {
      const data = await getSimulation();
      setSimulationData(data);

      const [updatedPositionData, updatedVelocityData] = processPositionVelocityData(data)

      setPositionData(updatedPositionData);
      setVelocityData(updatedVelocityData);
      console.log("Set plot data!");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const newSimulation = (newState: any) => {};

  useEffect(() => {
    //TODO: update react version from 18. Due to React 18's Strict Mode, this will only run twice
    getSimulationData();
}, []);

    console.log({positionData})
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
