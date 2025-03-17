import { Flex, Separator } from '@radix-ui/themes';
import OrbitalVisualization from 'examples/OrbitalVisualization';
import { PlotPosition } from 'molecules/PlotPosition';
import { PlotPositionVelocityPlayer } from 'molecules/PlotPositionVelocityPlayer';
import { PlotVelocity } from 'molecules/PlotVelocity';
import { Link } from 'react-router-dom';
import { Routes } from 'routes';

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: '0 auto',
      }}
    >
      <Flex direction="column" m="4" width="100%" justify="center" align="center">
        <Link to={Routes.FORM}>Define new simulation parameters</Link>
        <Separator size="4" my="5" />
        <Flex direction="row" width="100%" justify="center">
          <PlotPosition/>
          <PlotVelocity/>
          <PlotPositionVelocityPlayer />
          <OrbitalVisualization />          
        </Flex>
      </Flex>
    </div>
  );
};

export default App;
