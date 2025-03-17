import { DataPoint, PlottedAgentData, PlottedFrame, Vector } from "Api";

// frames: [
//   {
//     name: 'frame-0',
//     data: [
//       {
//         x: [0],
//         y: [0],
//         z: [0],
//       },
//       {
//         x: [1],
//         y: [1],
//         z: [1],
//       },
//     ],
//     traces: [0, 1], // Updates only the first two traces in the main data array
//   },
// ];
// const frame = {
//   name: "frame-0", // Unique identifier for the frame
//   data: [
//     {
//       type: "scatter3d",
//       mode: "markers",
//       name: "Body1",
//       x: [-0.73], // Updated X position for Body1
//       y: [0],     // Updated Y position for Body1
//       z: [0],     // Updated Z position for Body1
//       marker: {
//         size: 8,
//         color: "blue",
//       },
//     },
//   ],
//   traces: [0], // Index of the trace in the main `data` array corresponding to Body1
// };

const baseFrame = (name: string) => ({
  name,
  data: [],
  traces: [],
});

const baseData = (name: string, vector: Vector) => {
  const { x, y, z } = vector;
  return {
    name,
    x: [x],
    y: [y],
    z: [z],
    type: "scatter3d",
    mode: "lines+markers",
    marker: { size: 3 },
    line: { width: 5 },
  };
};

export const processFramesData = (
  data: DataPoint[]
): [PlottedAgentData[], PlottedAgentData[]] => {
  const frameData: PlottedFrame[] = []
  data.forEach(([timeStart, timeEnd, frames]: [number, number, Record<string, { position: Vector; velocity: Vector }>], index) => {
    if (index > 0) {
      return;
    }
    const newFrame= baseFrame(`frame-${index}`);
    const frameKeys = Object.keys(frames); // Body1, Body2

    frameKeys.forEach((frameKey) => {
      const { position, velocity } = frames[frameKey] as { position: Vector; velocity: Vector };
      newFrame.data.push(baseData(`${frameKey} position`, position));
      newFrame.data.push(baseData(`${frameKey} velocity`, velocity));
    });
    frameData.push(newFrame);
  });
  return frameData
};

export const processData = (
  data: DataPoint[]
): [PlottedAgentData[], PlottedAgentData[]] => {
  const baseData = (name: string) => ({
    name,
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

  data.forEach(([timeStart, timeEnd, frame]) => {
    for (let [agentId, val] of Object.entries(frame)) {
      if (agentId == "time" || agentId == "timeStep") {
        continue;
      }
      let { position, velocity } = val;
      updatedPositionData[agentId] =
        updatedPositionData[agentId] || baseData(agentId);
      updatedPositionData[agentId].x.push(position.x);
      updatedPositionData[agentId].y.push(position.y);
      updatedPositionData[agentId].z.push(position.z);

      updatedVelocityData[agentId] =
        updatedVelocityData[agentId] || baseData(agentId);
      updatedVelocityData[agentId].x.push(velocity.x);
      updatedVelocityData[agentId].y.push(velocity.y);
      updatedVelocityData[agentId].z.push(velocity.z);
    }
  });
  return [
    Object.values(updatedPositionData),
    Object.values(updatedVelocityData),
  ];
};
