import { Flex, Separator } from '@radix-ui/themes';
import { Drawer } from 'molecules/Drawer';
import { OrbitalVisualization } from 'Plots/OrbitalVisualization';
import { PlotPosition } from 'Plots/PlotPosition';
import { PlotVelocity } from 'Plots/PlotVelocity';
import SimulateForm from 'SimulateForm';

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: '0 auto',
      }}
    > 
    <Drawer open={true}>
      <SimulateForm/>
    </Drawer>
      <Flex direction="column"justify="center" align="center">
        <Separator size="4" my="5" />
        <Flex direction="row" width="100%" height={'calc(100vh - 100px)'} justify="center">
          {/* <PlotPosition/> */}
          {/* <PlotVelocity/> */}
          
          <OrbitalVisualization />          
        </Flex>
      </Flex>
    </div>
  );
};

export default App;
