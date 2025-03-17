import { Box, Button, Card, Flex } from "@radix-ui/themes";
import { useSimulationContext } from "context/Simulation";
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { calculateMinMax } from "utilities";
import { PlayerControls } from "./PlayerControls";
import { CardCurrentData } from "molecules/CardCurrentData";

export const OrbitalVisualization = () => {
  const { simulationData, plotData, currentPlotData } = useSimulationContext();
  const [data, setData] = useState<Array<any>>([]);
  const [layout, setLayout] = useState({});
  const [showVelocityVectors, setShowVelocityVectors] = useState(true);
  const [showCurrentOnly, setShowCurrentOnly] = useState(false);
  const [showMetaData, setShowMetaData] = useState(false);

  useEffect(() => {
    if (!plotData && !simulationData) return;
    const { body1Positions, body2Positions } = plotData || {
      body1Positions: [],
      body2Positions: [],
    };
    const { currentPositions, currentVelocities } = currentPlotData || {
      currentPositions: [],
      currentVelocities: [],
    };

    setData(
      showCurrentOnly
        ? [
            ...currentPositions,
            ...(showVelocityVectors ? currentVelocities : []),
          ]
        : [
            body1Positions,
            body2Positions,
            ...currentPositions,
            ...(showVelocityVectors ? currentVelocities : []),
          ]
    );

    const { minX, maxX, minY, maxY, minZ, maxZ } = calculateMinMax({
      body1Positions: simulationData?.body1Positions || [],
      body2Positions: simulationData?.body2Positions || [],
    });

    // Set the 3D layout
    setLayout({
      title: "Orbital Visualization",
      autosize: true,

      scene: {
        aspectmode: "manual",
        aspectratio: {
          x: 1,
          y: 1,
          z: 1,
        },
        xaxis: {
          title: "X Position",
          range: [minX - 5, maxX + 5],
        },
        yaxis: {
          title: "Y Position",
          range: [minY - 5, maxY + 5],
        },
        zaxis: {
          title: "Z Position",
          range: [minZ - 5, maxZ + 5],
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 },
        },
      },
      margin: { l: 0, r: 0, b: 0, t: 50 },
      legend: {
        x: 1,
        y: 1,
      },
    });
  }, [showVelocityVectors, showCurrentOnly, currentPlotData, simulationData]);

  // Toggle velocity vectors
  const toggleVelocityVectors = () => {
    setShowVelocityVectors((prev) => !prev);
  };

  return (
    <>
      <Box
        style={{
          display: showMetaData ? "block" : "none",
          backgroundColor: "black",
          position: "absolute",
          zIndex: 1,
          top: 300,
          right: 10,
        }}
      >
        <CardCurrentData />
      </Box>
      <Box style={{ position: "absolute", zIndex: 1, bottom: 10, right: 10 }}>
        <Flex>
          <Card style={{ background: "black", width: 500 }}>
            <PlayerControls />
          </Card>
          <Card style={{ background: "black", marginLeft: "12px", width: 400 }}>
            <Flex gap={"6px"}>
              <Button onClick={toggleVelocityVectors}>
                {showVelocityVectors ? "○ Velocity" : "⦸ Velocity"}
              </Button>
              <Button onClick={() => setShowCurrentOnly((prev) => !prev)}>
                {showCurrentOnly ? "⦸ Trace" : "○ Trace"}
              </Button>
              <Button onClick={() => setShowMetaData((prev) => !prev)}>
                {showMetaData ? "○ Metadata" : "⦸ Metadata"}
              </Button>
            </Flex>
          </Card>
        </Flex>
      </Box>
      <Box style={{ width: "100%", height: "100%", background: "red" }}>
        <Plot
          data={data}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        />
      </Box>
    </>
  );
};
