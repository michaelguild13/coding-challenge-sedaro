export type DataValue = number | "";
type Vector = {
  x: DataValue;
  y: DataValue;
  z: DataValue;
};
type Body = {
  position: Vector;
  velocity: Vector;
  mass: DataValue;
};

export interface FormData {
  Body1: Body,
  Body2: Body
}

// TODO: Define Stronger Typing
type AgentData = Record<string, Record<string, number>>;
type DataFrame = Record<string, AgentData>;
export type DataPoint = [number, number, DataFrame];

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
