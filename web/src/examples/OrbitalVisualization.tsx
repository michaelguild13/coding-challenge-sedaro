import { Box, Button, Card, Flex} from '@radix-ui/themes';
import { useSimulationContext } from 'context/Simulation';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { calculateMinMax } from 'utilities';

const OrbitalVisualization = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [showVelocityVectors, setShowVelocityVectors] = useState(true);
  const { simulationData, plotData, currentPlotData, isPlaying, togglePlay, reset, previous, next  } = useSimulationContext();

  useEffect(() => {
    if (!plotData && !simulationData) return;
    const {body1Positions, body2Positions} = plotData
    const { currentPositions, currentVelocities} = currentPlotData
    setData([
      body1Positions,
      body2Positions,
      ...currentPositions,
      ...(showVelocityVectors ? currentVelocities : [])
    ]);
    
    // const { minX, maxX, minY, maxY, minZ, maxZ } = calculateMinMax({body1Positions, body2Positions});
    
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
          // range: [minX - 5, maxX + 5]
        },
        yaxis: {
          title: 'Y Position',
          // range: [minY - 5, maxY + 5]
        },
        zaxis: {
          title: 'Z Position',
          // range: [minZ - 5, maxZ + 5]
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
  }, [showVelocityVectors, currentPlotData, simulationData]);
  

  // Toggle velocity vectors
  const toggleVelocityVectors = () => {
    setShowVelocityVectors(prev => !prev);
  };

  return (
    <Card>
    <Flex direction="column" align="center">
      <Flex direction="row" align="center">
        <Button onClick={togglePlay}>
          {isPlaying ? '❚❚' : '▶'}
        </Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={previous}>{'<'}</Button>
        <Button onClick={next}>{'>'}</Button>
        <Button onClick={toggleVelocityVectors}>
          {showVelocityVectors ? 'Hide Velocity' : 'Show Velocity'}
        </Button>
      </Flex>
      <Box style={{ width: '100%', height: '100%' }}>
        <Plot
          data={data}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>

    </Flex>
    </Card>
  );
};

export default OrbitalVisualization;