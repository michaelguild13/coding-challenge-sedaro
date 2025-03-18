import { Flex } from '@radix-ui/themes';
import { useSimulationContext } from 'context/Simulation';
import { Drawer } from 'molecules/Drawer';
import { OrbitalVisualization } from 'Plots/OrbitalVisualization';
import { useEffect, useState } from 'react';
import SimulateForm from 'molecules/SimulateForm';

const App = () => {
  const { isLoading } = useSimulationContext()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setOpen(false);
    }
  }, [isLoading]);
  
  return (
    <>
    <Drawer open={open}>
      <SimulateForm/>
      {isLoading}
    </Drawer>
      
        <Flex direction="row" width="100%" height={'calc(100vh - 60px)'} justify="center">
          {/* <PlotPosition/> */}
          {/* <PlotVelocity/> */}
          <OrbitalVisualization />          
        </Flex>
        </>
  );
};

export default App;
