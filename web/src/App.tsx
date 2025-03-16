import { Flex, Heading, Separator, Table } from '@radix-ui/themes';
import { useSimulationContext } from 'context/Simulation';
import { PlotPosition } from 'molecules/PlotPosition';
import { PlotVelocity } from 'molecules/PlotVelocity';
import { Link } from 'react-router-dom';
import { Routes } from 'routes';

// Input data from the simulation
type AgentData = Record<string, Record<string, number>>;
type DataFrame = Record<string, AgentData>;
type DataPoint = [number, number, DataFrame];

// Output data to the plot
type PlottedAgentData = Record<string, number[]>;
type PlottedFrame = Record<string, PlottedAgentData>;

const App = () => {
  // const [initialState, setInitialState] = useState<DataFrame>({});
  // setInitialState(data[0][2]);
  const {positionData, velocityData} =  useSimulationContext()

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: '0 auto',
      }}
    >
      {/* Flex: https://www.radix-ui.com/themes/docs/components/flex */}
      <Flex direction="column" m="4" width="100%" justify="center" align="center">
        <Heading as="h1" size="8" weight="bold" mb="4">
          Simulation Data
        </Heading>
        <Link to={Routes.FORM}>Define new simulation parameters</Link>
        <Separator size="4" my="5" />
        <Flex direction="row" width="100%" justify="center">
          <PlotPosition/>
          <PlotVelocity/>
        </Flex>
        <Flex justify="center" width="100%" m="4">
          <Table.Root
            style={{
              width: '800px',
            }}
          >
            {/* Table: https://www.radix-ui.com/themes/docs/components/table */}
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Agent</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Initial Position (x,y, z)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Initial Velocity (x,y,z)</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* {Object.entries(initialState).flatMap(
                  ([agentId, { position, velocity }]) => {
                    if (position) {
                    return (
                <Table.Row key={agentId}>
                  <Table.RowHeaderCell>{agentId}</Table.RowHeaderCell>
                  <Table.Cell>
                    ({position.x}, {position.y}, {position.z})
                  </Table.Cell>
                  <Table.Cell>
                    ({velocity.x}, {velocity.y}, {velocity.z})
                  </Table.Cell>
                </Table.Row>
                  );} else {
                    return null;
                  }
                }
              )} */}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </div>
  );
};

export default App;
