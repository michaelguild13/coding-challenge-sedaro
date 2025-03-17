import { Card, Heading, Text } from "@radix-ui/themes";
import { useSimulationContext } from "context/Simulation";

export const CardCurrentData = () => {
    const { currentPlotData } = useSimulationContext();
    if (!currentPlotData) return <></>;
    const { currentPositions, currentVelocities } = currentPlotData;
    const [body1Positions, body2Positions] = currentPositions;
    const [body1Velocities, body2Velocities] = currentVelocities;
    return (
        <Card>
            <Heading>Current Data</Heading>
            <Text as="div">
                <strong>Body 1:</strong>
                <div>Position - X: {body1Positions?.x}, Y: {body1Positions?.y}, Z: {body1Positions?.z}</div>
                <div>Velocity - X: {body1Velocities?.x}, Y: {body1Velocities?.y}, Z: {body1Velocities?.z}</div>
            </Text>
            <Text as="div">
                <strong>Body 2:</strong>
                <div>Position 2 - X: {body2Positions?.x}, Y: {body2Positions?.y}, Z: {body2Positions?.z}</div>
                <div>Velocity 2 - X: {body2Velocities?.x}, Y: {body2Velocities?.y}, Z: {body2Velocities?.z}</div>
            </Text>
        </Card>
    );
};