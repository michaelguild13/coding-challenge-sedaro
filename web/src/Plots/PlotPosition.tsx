import { PlotSimple } from "atoms/PlotSimple"
import { useSimulationContext } from "context/Simulation";

export const PlotPosition = () => {
    const { plotData } = useSimulationContext();
    if ( !plotData ) return <></>
    const {body1Positions, body2Positions} = plotData
    return <PlotSimple title="Position" data={[body1Positions, body2Positions]} />
}