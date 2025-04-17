import { Text, Box, Flex, Badge, Separator, Heading } from '@radix-ui/themes';

export const OrbitalIndicators = () => {
  // Sample positive indicator data
  const indicators = [
    {
      name: "Energy Conservation",
      value: 99.97,
      unit: "%",
      status: "optimal",
      description: "Energy deviation within 0.03% over complete orbit"
    },
    {
      name: "Eccentricity",
      value: 0.016,
      unit: "",
      status: "stable",
      description: "Nearly circular orbit with minimal variation"
    },
    {
      name: "Periapsis Margin",
      value: 12.4,
      unit: "AU",
      status: "safe",
      description: "Well above minimum safe distance threshold"
    },
    {
      name: "Resonance Ratio",
      value: "2:1",
      unit: "",
      status: "locked",
      description: "Stable orbital resonance established"
    },
    {
      name: "Angular Momentum",
      value: 99.99,
      unit: "%",
      status: "conserved",
      description: "Nearly perfect conservation over simulation period"
    }
  ];

  // Function to determine color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'stable':
      case 'safe':
      case 'locked':
      case 'conserved':
        return 'green';
      case 'acceptable':
        return 'blue';
      case 'warning':
        return 'orange';
      case 'critical':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <Flex justify="between" align="center" mb="3">
        <Heading size="3" color="purple">Orbital Stability</Heading>
        <Badge size="1" color="green" variant="solid">OPTIMAL</Badge>
      </Flex>
      
      <Box>
        {indicators.map((indicator, index) => (
          <Box key={index}>
            {index > 0 && <Separator my="2" size="1" />}
            <Flex justify="between" align="center">
              <Text size="2" weight="medium" color="purple">{indicator.name}</Text>
              <Flex align="center" gap="1">
                <Text size="2" weight="bold" color="purple">
                  {indicator.value}{indicator.unit}
                </Text>
                <Box 
                  style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: getStatusColor(indicator.status) 
                  }}
                />
              </Flex>
            </Flex>
            <Text size="1" color="purple">{indicator.description}</Text>
          </Box>
        ))}
      </Box>
      
      <Separator my="3" size="1" />
      <Flex justify="between" align="center">
        <Text size="2" weight="medium" color="purple">System Classification:</Text>
        <Text size="2" weight="bold" color="blue">Type II Stable</Text>
      </Flex>
      <Text size="1" color="blue" mt="1">
        Projected stability period: 10⁷ years
      </Text>
    </Box>
  );
};

export default OrbitalIndicators;