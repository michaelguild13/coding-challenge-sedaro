import { DataPoint, PlottedAgentData, PlottedFrame, Vector } from "Api";

const baseFrame = (name: string) => ({
  name,
  data: [],
  traces: [],
});

const baseData = (name: string, vector?: Vector) => {
  return {
    name,
    x: [vector?.x],
    y: [vector?.y],
    z: [vector?.z],
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
  const initData = []
  data.forEach(([timeStart, timeEnd, frames]: [number, number, Record<string, { position: Vector; velocity: Vector }>], index) => {
    // if(index > 10) return
    const newFrame= baseFrame(`frame-${index}`);
    const frameKeys = Object.keys(frames); // Body1, Body2
     
    frameKeys.forEach((frameKey) => {
      const { position, velocity } = frames[frameKey] as { position: Vector; velocity: Vector };
      newFrame.data.push(baseData(`${frameKey} position`, position));
      newFrame.data.push(baseData(`${frameKey} velocity`, velocity));
      if( frameKey === "Body1") {
        newFrame.traces.push(0)
        newFrame.traces.push(1)
      }
      if( frameKey === "Body2") {
        newFrame.traces.push(2)
        newFrame.traces.push(3)
      }
      // Only add initial data once
      if (index === 0) {
        initData.push(baseData(`${frameKey} position`, position));
        initData.push(baseData(`${frameKey} velocity`, velocity));
      }
    });
    
    frameData.push(newFrame);
  });
  console.log(frameData);
  return { data: initData, frames: frameData}
};

export const processData = (
  data: DataPoint[]
): [PlottedAgentData[], PlottedAgentData[]] => {
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
