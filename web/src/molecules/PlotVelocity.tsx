import { PlotSimple } from "atoms/PlotSimple";
import { useSimulationContext } from "context/Simulation";

export const PlotVelocity = () => {
    const { plotData } = useSimulationContext();
    if ( !plotData ) return <></>
    const {body1Velocities, body2Velocities} = plotData
    return <PlotSimple title="Velocity" data={[body1Velocities, body2Velocities]} />
}