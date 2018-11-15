import {PromptObject} from "prompts";
import prompts from "prompts";

export interface PromptResponse {
  pickupLatitude: string;
  pickupLongitude: string;
  dropoffLatitude: string;
  dropoffLongitude: string;
  no_of_passengers: number;
}
export function askQuestions() {
  const questions: PromptObject[] = [
    {
      type: 'text',
      name: 'pickupLatitude',
      message: 'Pickup Latitude',
      validate: isInputFloat
    },
    {
      type: 'text',
      name: 'pickupLongitude',
      message: 'Pickup Longitude',
      validate: isInputFloat
    },
    {
      type: 'text',
      name: 'dropoffLatitude',
      message: 'Dropoff Latitude',
      validate: isInputFloat
    },
    {
      type: 'text',
      name: 'dropoffLongitude',
      message: 'Dropoff Latitude',
      validate: isInputFloat
    },
    {
      type: 'number',
      name: 'no_of_passengers',
      message: "Number of Passengers"
    }
  ];
 
 return prompts(questions) as PromptResponse;
};

export function isInputFloat(value: string) {
  const converterdValue = Number(value);
  return  isNaN(converterdValue) ? `Only floats are allowed` : true; 
}

export function allInputsProvided(input: any) {
  return 'pickupLatitude' in input &&
  'pickupLongitude' in input &&
  'dropoffLatitude' in input &&
  'dropoffLongitude' in input &&
  'no_of_passengers' in input
}
