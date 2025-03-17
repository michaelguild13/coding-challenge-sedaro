export type DataValue = number | "";
export type Vector = {
  x: DataValue;
  y: DataValue;
  z: DataValue;
};
export type Body = {
  position: Vector;
  velocity: Vector;
  mass: DataValue;
  time?: DataValue;
  timeStep?: DataValue;
};

export interface FormData {
  Body1: Body,
  Body2: Body
}

// TODO: Define Stronger Typing
// Input data from the simulation
export type DataFrame = {
  Body1: Body,
  Body2: Body
};
export type DataPoint = [number, number, DataFrame];

// Output data to the plot
export type PlottedAgentData = Record<string, number[]>;
export type PlottedFrame = Record<string, PlottedAgentData>;

const fetchApi = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(`http://localhost:8000/${url}`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: DataPoint[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Gets the current Simulation data
export const getSimulation = async () => {
  return await fetchApi("simulation");
};

// Creates new Simulation
export const postSimulation = async (formData: FormData) => {
  const body = JSON.stringify(formData);
  return await fetchApi("simulation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};
