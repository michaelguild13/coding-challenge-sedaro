import { Form, FormField, FormLabel } from '@radix-ui/react-form';
import { Button, Card, Flex, Heading, Separator, TextField, Grid, Box, Text } from '@radix-ui/themes';
import { DataValue, FormData, postSimulation } from 'Api';
import { useSimulationContext } from 'context/Simulation';
import _ from 'lodash';
import React, { useCallback, useState, useEffect } from 'react';

const initFormValues = {
  Body1: { position: {x: -0.73, y: 0, z: 0}, velocity: {x: 0, y: -0.0015, z: 0}, mass: 1 },
  Body2: { position: {x: 60.34, y: 0, z: 0}, velocity: {x: 0, y: 0.13, z: 0}, mass: 0.0123 },
}

const SimulateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initFormValues);
  const { newSimulation } = useSimulationContext()
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newValue = value === '' ? 0 : parseFloat(value);
      
      // Create a deep copy of the previous state to ensure proper updates
      setFormData(prev => {
        const newState = _.cloneDeep(prev);
        _.set(newState, name, newValue);
        return newState;
      });
    }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await newSimulation(formData);
        // loader and close form
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [formData, newSimulation]
  );

  const resetForm = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setFormData(_.cloneDeep(initFormValues));
  }, []);

  // Helper component for vector input (position or velocity)
  interface VectorInputProps {
      bodyName: keyof FormData;
      vectorType: 'position' | 'velocity';
      values: { x: DataValue; y: DataValue; z: DataValue };
    }

  const VectorInput: React.FC<VectorInputProps> = ({ bodyName, vectorType, values }) => (
    <Box mb="3">
      <Text size="2" weight="bold" mb="1">{`Initial ${vectorType}`}</Text>
      <Grid columns="3" gap="2">
        {(['x', 'y', 'z'] as Array<keyof typeof values>).map(axis => (
          <FormField key={axis} name={`${bodyName}.${vectorType}.${axis}`} style={{display: 'flex'}}>
            <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor={`${bodyName}.${vectorType}.${axis}`}>{`${axis.toUpperCase()}`}</FormLabel>
            <TextField.Root
              type="number"
              id={`${bodyName}.${vectorType}.${axis}`}
              name={`${bodyName}.${vectorType}.${axis}`}
              value={values[axis].toString()} // Ensure it's a string for the input
              onChange={handleChange}
              required
              step="0.001"
            />
          </FormField>
        ))}
      </Grid>
    </Box>
  );

  // Helper component for rendering a celestial body's input fields
  const BodyInputs: React.FC<{ bodyName: keyof FormData }> = ({ bodyName }) => (
    <Box mb="4">
      <Heading as="h3" size="3" weight="bold" mb="3">
        {bodyName}
      </Heading>
      <VectorInput 
        bodyName={bodyName} 
        vectorType="position" 
        values={formData[bodyName].position} 
      />
      <VectorInput 
        bodyName={bodyName} 
        vectorType="velocity" 
        values={formData[bodyName].velocity} 
      />
      <FormField name={`${bodyName}.mass`}>
        <FormLabel htmlFor={`${bodyName}.mass`}>Mass</FormLabel>
        <TextField.Root
          type="number"
          id={`${bodyName}.mass`}
          name={`${bodyName}.mass`}
          value={formData[bodyName].mass.toString()} // Ensure it's a string for the input
          onChange={handleChange}
          required
          step="0.001"
        />
      </FormField>
    </Box>
  );

  return (
    <Card style={{ width: '100%', maxWidth: '100%', backgroundColor: 'black' }}>
      <Heading as="h2" size="4" weight="bold" mb="2">
        Run a Simulation
      </Heading>
      <Text size="2" color="gray">Configure initial parameters for celestial bodies</Text>
      <Separator size="4" my="4" />
      
      <Form onSubmit={handleSubmit}>
        <BodyInputs bodyName="Body1" />
        <Separator size="4" my="4" />
        <BodyInputs bodyName="Body2" />
        
        <Flex gap="3" mt="4" justify="between">
          <Button onClick={resetForm}>
            Reset Values
          </Button>
          <Button type="submit">
            Run Simulation
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default SimulateForm;