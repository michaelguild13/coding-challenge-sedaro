import { DataPoint, PlottedAgentData, PlottedFrame, Vector } from "Api";

export type SimulationData = {
  body1Positions: Vector[];
  body1Velocities: Vector[];
  body2Positions: Vector[];
  body2Velocities: Vector[];
  timePoints: number[];
};

export const getPlotData = ({ 
  body1Positions, 
  body2Positions, 
  body1Velocities, 
  body2Velocities,
}: { 
  body1Positions: Vector[], 
  body2Positions: Vector[], 
  body1Velocities: Vector[], 
  body2Velocities: Vector[] 
}) => {
  const createTrace = (data: Vector[], name: string): Partial<Plotly.PlotData> => ({
    type: 'scatter3d',
    mode: 'lines+markers',
    name,
    x: data.map(p => p.x),
    y: data.map(p => p.y),
    z: data.map(p => p.z),
    marker: {
      size: 5,
      opacity: 0.5
    },
    line: {
      width: 2
    }
  });
  
  return {
    body1Positions: createTrace(body1Positions, 'Body 1 Orbit'),
    body1Velocities: createTrace(body1Velocities, 'Body 1 Velocity'),
    body2Positions: createTrace(body2Positions, 'Body 2 Orbit'),
    body2Velocities: createTrace(body2Velocities, 'Body 2 Velocity')
  };
};

export const getCurrentPlotData = ({data, currentTimeIndex, velocityScale = 500}: { data: SimulationData, currentTimeIndex: number, velocityScale?: number }) => {
  const { 
    body1Positions, 
    body2Positions, 
    body1Velocities, 
    body2Velocities,
    timePoints
  } = data;
  
  const timeIndex = currentTimeIndex % timePoints.length;
  
  // Helper to create current position marker
  const createPositionMarker = (positions: Vector[], bodyName: string) => {
    if (positions.length <= timeIndex) return null;
    
    const position = positions[timeIndex];
    return {
      type: 'scatter3d',
      mode: 'markers',
      name: `${bodyName} Current`,
      x: [position.x],
      y: [position.y],
      z: [position.z],
      marker: {
        size: 10,
        symbol: 'circle',
        opacity: 0.8
      }
    };
  };
  
  // Helper to create velocity vector
  const createVelocityVector = (positions: Vector[], velocities: Vector[], bodyName: string) => {
    if (positions.length <= timeIndex || velocities.length <= timeIndex) return null;
    
    const position = positions[timeIndex];
    const velocity = velocities[timeIndex];
    
    return {
      type: 'scatter3d',
      mode: 'lines+markers',
      name: `${bodyName} Velocity`,
      x: [Number(position.x), Number(position.x) + Number(velocity.x) * velocityScale],
      y: [Number(position.y), Number(position.y) + Number(velocity.y) * velocityScale],
      z: [Number(position.z), Number(position.z) + Number(velocity.z) * velocityScale],
      line: {
        width: 5
      },
      marker: {
        size: 3,
        symbol: 'diamond'
      }
    };
  };
  
  // Create current position markers
  const currentPositions = [
    createPositionMarker(body1Positions, 'Body1'),
    createPositionMarker(body2Positions, 'Body2')
  ].filter(Boolean);
  
  // Create velocity vectors if enabled
  const currentVelocities = [
    createVelocityVector(body1Positions, body1Velocities, 'Body1'),
    createVelocityVector(body2Positions, body2Velocities, 'Body2')
  ].filter(Boolean);
  
  return {
    currentPositions,
    currentVelocities
  }
};

export const processData = (
  data: DataPoint[]
) => {
  const result: {
    body1Positions: Vector[];
    body1Velocities: Vector[];
    body2Positions: Vector[];
    body2Velocities: Vector[];
    timePoints: number[];
    [key: string]: any;
  } = {
    body1Positions: [],
    body1Velocities: [],
    body2Positions: [],
    body2Velocities: [],
    timePoints: []
  };

  data.forEach(([_, time, bodiesData]) => {
    result.timePoints.push(time);

    Object.entries(bodiesData).forEach(([bodyKey, bodyData]) => {
      const lowerKey = bodyKey.toLowerCase();
      if (bodyData.position && bodyData.velocity) {
        result[`${lowerKey}Positions`].push({
          time,
          x: bodyData.position.x,
          y: bodyData.position.y,
          z: bodyData.position.z
        });

        result[`${lowerKey}Velocities`].push({
          time,
          x: bodyData.velocity.x,
          y: bodyData.velocity.y,
          z: bodyData.velocity.z
        });
      }
    });
  });

  return result;
};

export const calculateMinMax = ({ body1Positions, body2Positions }: { body1Positions: Vector[], body2Positions: Vector[] }) => {
  const extractAxisValues = (positions: Vector[], axis: keyof Vector) => positions.map(p => p[axis]);

  const allXPositions = [
    ...extractAxisValues(body1Positions, 'x'),
    ...extractAxisValues(body2Positions, 'x')
  ];
  const allYPositions = [
    ...extractAxisValues(body1Positions, 'y'),
    ...extractAxisValues(body2Positions, 'y')
  ];
  const allZPositions = [
    ...extractAxisValues(body1Positions, 'z'),
    ...extractAxisValues(body2Positions, 'z')
  ];

  const calculateBounds = (values: number[]) => ({
    min: Math.min(...values),
    max: Math.max(...values)
  });

  const xBounds = calculateBounds(allXPositions.filter(value => typeof value === 'number'));
  const yBounds = calculateBounds(allYPositions.filter(value => typeof value === 'number'));
  const zBounds = calculateBounds(allZPositions.filter(value => typeof value === 'number'));

  return {
    minX: xBounds.min,
    maxX: xBounds.max,
    minY: yBounds.min,
    maxY: yBounds.max,
    minZ: zBounds.min,
    maxZ: zBounds.max
  };
};
