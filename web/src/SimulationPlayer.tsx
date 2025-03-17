import { Button, Flex, Slider, Text } from '@radix-ui/themes';
import { useSimulationContext } from 'context/Simulation';
import { useCallback, useEffect, useState } from 'react';

const SimulationPlayer = () => {
  const {positionData} =  useSimulationContext()
  const [timeCurrent, setTimeCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const timeStart = 0
  const timeEnd = 100
  const atEnd = timeCurrent >= timeEnd
  // Play/Pause toggle
  const togglePlayback = useCallback(() => {
  }, []);
  
  // Reset to beginning
  const resetPlayback = useCallback(() => {
  }, []);
  
  // Skip to end
  const skipToEnd = useCallback(() => {
  }, []);
  
  // Handle slider change
  const handleSliderChange = useCallback((value: number[]) => {
  }, []);

  // Playback animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeCurrent(prevTime => {
        if (atEnd) {
          setIsPlaying(false);
          return prevTime;
        }
        return prevTime + 1;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex direction="column" width="100%" gap="2" p="4">
      <Flex justify="between" align="center" width="100%">
        <Text size="2">Time:</Text>
      </Flex>
      
      <Slider 
        value={[timeCurrent]} 
        min={timeStart} 
        max={timeEnd}
        step={1}
        onValueChange={handleSliderChange}
        size="3"
      />
      
      <Flex justify="center" align="center" gap="4">
        <Button 
          variant="soft" 
          onClick={resetPlayback}
          size="2"
        >
          reset
        </Button>
        
        <Button 
          variant="soft" 
          onClick={togglePlayback}
          size="3"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        
        <Button 
          variant="soft" 
          onClick={skipToEnd}
          size="2"
        >
          Skip
        </Button>
        
        <Flex align="center" gap="2" ml="4">
          <Text size="2">Speed:</Text>
          <Slider 
            value={[playbackSpeed]} 
            min={0.1} 
            max={10} 
            step={0.1}
            onValueChange={(value) => setPlaybackSpeed(value[0])}
            size="2"
            style={{ width: '100px' }}
          />
          <Text size="2">{playbackSpeed.toFixed(1)}x</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SimulationPlayer;