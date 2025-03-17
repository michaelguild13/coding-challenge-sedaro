import { Box, Button, Flex} from '@radix-ui/themes';
import { useSimulationContext } from 'context/Simulation';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';


const calculateMinMax = (data) => {
  // Calculate bounds for the layout
  const allXPositions = [
    ...data.body1Positions.map(p => p.x), 
    ...data.body2Positions.map(p => p.x)
  ];
  const allYPositions = [
    ...data.body1Positions.map(p => p.y), 
    ...data.body2Positions.map(p => p.y)
  ];
  const allZPositions = [
    ...data.body1Positions.map(p => p.z), 
    ...data.body2Positions.map(p => p.z)
  ];

  const minX = Math.min(...allXPositions);
  const maxX = Math.max(...allXPositions);
  const minY = Math.min(...allYPositions);
  const maxY = Math.max(...allYPositions);
  const minZ = Math.min(...allZPositions);
  const maxZ = Math.max(...allZPositions);
  return { minX, maxX, minY, maxY, minZ, maxZ };
}

const extractData = (data) => {
  const body1Positions = [];
  const body1Velocities = [];
  const body2Positions = [];
  const body2Velocities = [];
  const timePoints: number[] = [];
  
  data.forEach(timePoint => {
    const time = timePoint[1]; // Trust the second time point
    timePoints.push(time);
    const bodiesData = timePoint[2];
    
    if (bodiesData.Body1) {
      const position = bodiesData.Body1.position;
      body1Positions.push({
        time,
        x: position.x,
        y: position.y,
        z: position.z
      });
      
      const velocity = bodiesData.Body1.velocity;
      body1Velocities.push({
        time,
        x: velocity.x,
        y: velocity.y,
        z: velocity.z
      });
    }
    
    if (bodiesData.Body2) {
      const position = bodiesData.Body2.position;
      body2Positions.push({
        time,
        x: position.x,
        y: position.y,
        z: position.z
      });
      
      const velocity = bodiesData.Body2.velocity;
      body2Velocities.push({
        time,
        x: velocity.x,
        y: velocity.y,
        z: velocity.z
      });
    }
  });
  
  return { 
    body1Positions, 
    body1Velocities, 
    body2Positions, 
    body2Velocities,
    timePoints
  };
};

const preparePlotData = ({extractedData, currentTimeIndex, showVelocityVectors, velocityScale}) => {
  const { 
    body1Positions, 
    body2Positions, 
    body1Velocities, 
    body2Velocities,
    timePoints
  } = extractedData
  
  // Body1 position trace
  const body1PositionTrace = {
    type: 'scatter3d',
    mode: 'lines+markers',
    name: 'Body1 Orbit',
    x: body1Positions.map(p => p.x),
    y: body1Positions.map(p => p.y),
    z: body1Positions.map(p => p.z),
    marker: {
      size: 5,
      color: 'blue',
      opacity: 0.5
    },
    line: {
      color: 'blue',
      width: 2,
      opacity: 0.5
    }
  };
  
  // Body2 position trace
  const body2PositionTrace = {
    type: 'scatter3d',
    mode: 'lines+markers',
    name: 'Body2 Orbit',
    x: body2Positions.map(p => p.x),
    y: body2Positions.map(p => p.y),
    z: body2Positions.map(p => p.z),
    marker: {
      size: 5,
      color: 'red',
      opacity: 0.5
    },
    line: {
      color: 'red',
      width: 2,
      opacity: 0.5
    }
  };
  
  // Current position markers
  const timeIndex = currentTimeIndex % timePoints.length;
  
  const currentPositions = [];
  
  if (body1Positions.length > timeIndex) {
    const position = body1Positions[timeIndex];
    currentPositions.push({
      type: 'scatter3d',
      mode: 'markers',
      name: 'Body1 Current',
      x: [position.x],
      y: [position.y],
      z: [position.z],
      marker: {
        size: 10,
        color: 'darkblue',
        symbol: 'circle',
        opacity: 0.8
      }
    });
  }
  
  if (body2Positions.length > timeIndex) {
    const position = body2Positions[timeIndex];
    currentPositions.push({
      type: 'scatter3d',
      mode: 'markers',
      name: 'Body2 Current',
      x: [position.x],
      y: [position.y],
      z: [position.z],
      marker: {
        size: 10,
        color: 'darkred',
        symbol: 'circle',
        opacity: 0.8
      }
    });
  }
  
  // Add velocity vectors if enabled
  const velocityArrows = [];
  
  if (showVelocityVectors) {
    // Body1 velocity
    if (body1Positions.length > timeIndex && body1Velocities.length > timeIndex) {
      const position = body1Positions[timeIndex];
      const velocity = body1Velocities[timeIndex];
      
      velocityArrows.push({
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'Body1 Velocity',
        x: [position.x, position.x + velocity.x * velocityScale],
        y: [position.y, position.y + velocity.y * velocityScale],
        z: [position.z, position.z + velocity.z * velocityScale],
        line: {
          color: 'cyan',
          width: 5
        },
        marker: {
          size: 3,
          color: 'cyan',
          symbol: 'diamond'
        }
      });
    }
    
    // Body2 velocity
    if (body2Positions.length > timeIndex && body2Velocities.length > timeIndex) {
      const position = body2Positions[timeIndex];
      const velocity = body2Velocities[timeIndex];
      
      velocityArrows.push({
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'Body2 Velocity',
        x: [position.x, position.x + velocity.x * velocityScale],
        y: [position.y, position.y + velocity.y * velocityScale],
        z: [position.z, position.z + velocity.z * velocityScale],
        line: {
          color: 'orange',
          width: 5
        },
        marker: {
          size: 3,
          color: 'orange',
          symbol: 'diamond'
        }
      });
    }
  }
  
  return [
    body1PositionTrace, 
    body2PositionTrace, 
    ...currentPositions,
    ...velocityArrows
  ];
};

const OrbitalVisualization = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [showVelocityVectors, setShowVelocityVectors] = useState(true);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [playInterval, setPlayInterval] = useState(null);
  const { simulationData} = useSimulationContext();
  const velocityScale = 500

  useEffect(() => {
    return () => {
      if (playInterval) {
        clearInterval(playInterval);
      }
    };
  }, [playInterval]);

  useEffect(() => {
    if (!simulationData) return;
    const extractedData = extractData(simulationData);
    const plotData = preparePlotData({extractedData, currentTimeIndex, showVelocityVectors, velocityScale});
    
    setData(plotData);
    
    const { minX, maxX, minY, maxY, minZ, maxZ } = calculateMinMax(extractedData);
    
    // Set the 3D layout
    setLayout({
      title: 'Orbital Visualization',
      autosize: true,
      height: '100vh',
      scene: {
        aspectmode: 'manual',
        aspectratio: {
          x: 1, y: 1, z: 1
        },
        xaxis: {
          title: 'X Position',
          range: [minX - 5, maxX + 5]
        },
        yaxis: {
          title: 'Y Position',
          range: [minY - 5, maxY + 5]
        },
        zaxis: {
          title: 'Z Position',
          range: [minZ - 5, maxZ + 5]
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      },
      margin: { l: 0, r: 0, b: 0, t: 50 },
      legend: {
        x: 0,
        y: 1
      }
    });
  }, [showVelocityVectors, velocityScale, currentTimeIndex, simulationData]);

  // Advance to next time point
  const handleNextTime = () => {
    setCurrentTimeIndex(prev => (prev === 0 ? 2 : (prev + 1) % simulationData.length));
  };

  // Go to previous time point
  const handlePreviousTime = () => {
    setCurrentTimeIndex(prev => (prev > 0 ? prev - 1 : simulationData.length - 1));
  };

  // Toggle velocity vectors
  const toggleVelocityVectors = () => {
    setShowVelocityVectors(prev => !prev);
  };

  const handlePlay = () => {
    if (playInterval) {
      clearInterval(playInterval);
      setPlayInterval(null);
    } else {
      const interval = setInterval(() => {
        setCurrentTimeIndex(prev => (prev + 1) % simulationData.length); // loop back
      }, 100);
      setPlayInterval(interval);
    }
  };

  const handleReset = () => {
    setCurrentTimeIndex(0);
  };

  return (
    <Flex direction="column" align="center">
      <Flex direction="row" align="center">
        <Button onClick={handlePlay}>
          {playInterval ? '❚❚' : '▶'}
        </Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handlePreviousTime}>{'<'}</Button>
        <Button onClick={handleNextTime}>{'>'}</Button>
        <Button onClick={toggleVelocityVectors}>
          {showVelocityVectors ? 'Hide Velocity' : 'Show Velocity'}
        </Button>
      </Flex>
      <Box>
        <Plot
          data={data}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: '500px', height: '500px' }}
        />
      </Box>

    </Flex>
  );
};

export default OrbitalVisualization;