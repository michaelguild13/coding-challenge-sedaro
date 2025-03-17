import { Card, Slider } from "@radix-ui/themes"
import { useSimulationContext } from "context/Simulation"

export const SliderTimeline = () => {
    const { timeMax, timeCurrent, setCurrentTimeIndex } = useSimulationContext()
    return (
    <Card style={{width: '100%'}}>
    <Slider 
        value={[timeCurrent]} 
        min={0} 
        max={timeMax} 
        step={1}
        onValueChange={(value) => setCurrentTimeIndex(value[0])}
        size="3"
        style={{ width: '100%' }}
    />
    </Card>)
}