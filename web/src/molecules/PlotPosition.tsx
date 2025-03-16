import { Plot } from "atoms/Plot"
import { useSimulationContext } from "conttext/Simulation";

export const PlotPosition = () => {
    const { positionData } = useSimulationContext();
    return <Plot title="Position" data={positionData} />
}