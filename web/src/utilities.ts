import { DataPoint, PlottedAgentData, PlottedFrame } from "Api";

export const processPositionVelocityData = (
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
  data.forEach(([t0, t1, frame]) => {
    for (let [agentId, val] of Object.entries(frame)) {
      if (agentId == "time" || agentId == "timeStep") {
        continue;
      }
      let { position, velocity } = val;
      updatedPositionData[agentId] = updatedPositionData[agentId] || baseData(agentId);
      updatedPositionData[agentId].x.push(position.x);
      updatedPositionData[agentId].y.push(position.y);
      updatedPositionData[agentId].z.push(position.z);

      updatedVelocityData[agentId] = updatedVelocityData[agentId] || baseData(agentId);
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
