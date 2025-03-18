import { Form, FormField, FormLabel } from '@radix-ui/react-form';
import { Button, Card, Flex, Heading, Separator, TextField, Grid, Box, Text } from '@radix-ui/themes';
import { DataValue, FormData } from 'Api';
import { useSimulationContext } from 'context/Simulation';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';

const initFormValues = {
  Body1: { position: {x: -0.73, y: 0, z: 0}, velocity: {x: 0, y: -0.0015, z: -0.0015}, mass: 1 },
  Body2: { position: {x: 60.34, y: 0, z: 0}, velocity: {x: 0, y: 0.13, z: 0}, mass: 0.0123 },
}

const SimulateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initFormValues);
  const { newSimulation } = useSimulationContext();
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = value === '' ? '' : parseFloat(value);
    
    setFormData(prev => {
      const newState = _.cloneDeep(prev);
      _.set(newState, name, newValue);
      return newState;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Convert any empty strings to 0 before submission
      const cleanedFormData = _.cloneDeep(formData);
      const replaceEmptyWithZero = (obj: any) => {
        Object.keys(obj).forEach(key => {
          if (obj[key] === '') {
            obj[key] = 0;
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            replaceEmptyWithZero(obj[key]);
          }
        });
      };
      
      replaceEmptyWithZero(cleanedFormData);
      
      try {
        await newSimulation(cleanedFormData);
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

  return (
    <Card style={{ width: '100%', maxWidth: '100%', backgroundColor: 'black' }}>
      <Heading as="h2" size="4" weight="bold" mb="2">
        Run a Simulation
      </Heading>
      <Text size="2" color="gray">Configure initial parameters for celestial bodies</Text>
      <Separator size="4" my="4" />
      
      <Form onSubmit={handleSubmit}>
        {/* Body1 Inputs */}
        <Box mb="4">
          <Heading as="h3" size="3" weight="bold" mb="3">
            Body1
          </Heading>

          {/* Position Inputs for Body1 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="1">Initial position</Text>
            <Grid columns="3" gap="2">
              <FormField name="Body1.position.x" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body1.position.x">X</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body1.position.x"
                  name="Body1.position.x"
                  value={formData.Body1.position.x.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body1.position.y" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body1.position.y">Y</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body1.position.y"
                  name="Body1.position.y"
                  value={formData.Body1.position.y.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body1.position.z" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body1.position.z">Z</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body1.position.z"
                  name="Body1.position.z"
                  value={formData.Body1.position.z.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
            </Grid>
          </Box>

          {/* Velocity Inputs for Body1 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="1">Initial velocity</Text>
            <Grid columns="3" gap="2">
              <FormField name="Body1.velocity.x" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body1.velocity.x">X</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body1.velocity.x"
                  name="Body1.velocity.x"
                  value={formData.Body1.velocity.x.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body1.velocity.y" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body1.velocity.y">Y</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body1.velocity.y"
                  name="Body1.velocity.y"
                  value={formData.Body1.velocity.y.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body1.velocity.z" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body1.velocity.z">Z</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body1.velocity.z"
                  name="Body1.velocity.z"
                  value={formData.Body1.velocity.z.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
            </Grid>
          </Box>

          {/* Mass Input for Body1 */}
          <FormField name="Body1.mass">
            <FormLabel htmlFor="Body1.mass">Mass</FormLabel>
            <TextField.Root
              type="number"
              id="Body1.mass"
              name="Body1.mass"
              value={formData.Body1.mass.toString()}
              onChange={handleChange}
              required
              step="0.001"
            />
          </FormField>
        </Box>

        <Separator size="4" my="4" />

        {/* Body2 Inputs */}
        <Box mb="4">
          <Heading as="h3" size="3" weight="bold" mb="3">
            Body2
          </Heading>

          {/* Position Inputs for Body2 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="1">Initial position</Text>
            <Grid columns="3" gap="2">
              <FormField name="Body2.position.x" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body2.position.x">X</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body2.position.x"
                  name="Body2.position.x"
                  value={formData.Body2.position.x.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body2.position.y" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body2.position.y">Y</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body2.position.y"
                  name="Body2.position.y"
                  value={formData.Body2.position.y.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body2.position.z" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body2.position.z">Z</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body2.position.z"
                  name="Body2.position.z"
                  value={formData.Body2.position.z.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
            </Grid>
          </Box>

          {/* Velocity Inputs for Body2 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="1">Initial velocity</Text>
            <Grid columns="3" gap="2">
              <FormField name="Body2.velocity.x" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body2.velocity.x">X</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body2.velocity.x"
                  name="Body2.velocity.x"
                  value={formData.Body2.velocity.x.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body2.velocity.y" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body2.velocity.y">Y</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body2.velocity.y"
                  name="Body2.velocity.y"
                  value={formData.Body2.velocity.y.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
              <FormField name="Body2.velocity.z" style={{display: 'flex'}}>
                <FormLabel style={{alignContent: 'center', paddingRight: 10}} htmlFor="Body2.velocity.z">Z</FormLabel>
                <TextField.Root
                  type="number"
                  id="Body2.velocity.z"
                  name="Body2.velocity.z"
                  value={formData.Body2.velocity.z.toString()}
                  onChange={handleChange}
                  required
                  step="0.001"
                />
              </FormField>
            </Grid>
          </Box>

          {/* Mass Input for Body2 */}
          <FormField name="Body2.mass">
            <FormLabel htmlFor="Body2.mass">Mass</FormLabel>
            <TextField.Root
              type="number"
              id="Body2.mass"
              name="Body2.mass"
              value={formData.Body2.mass.toString()}
              onChange={handleChange}
              required
              step="0.001"
            />
          </FormField>
        </Box>
        
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