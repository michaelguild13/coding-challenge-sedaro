import { Plot } from "atoms/Plot";
import { useSimulationContext } from "context/Simulation";

export const PlotVelocity = () => {
    const { velocityData } = useSimulationContext();
    return <Plot title="Velocity" data={velocityData} />
}