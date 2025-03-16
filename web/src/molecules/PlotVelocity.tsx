import { Plot } from "atoms/Plot";
import { useSimulationContext } from "conttext/Simulation";

export const PlotVelocity = () => {
    const { velocityData } = useSimulationContext();
    return <Plot title="Position" data={velocityData} />
}