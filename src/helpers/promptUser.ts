import {PromptObject} from "prompts";
import prompts from "prompts";
import { validateInput } from "./validators";

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
      validate: validateInput
    },
    {
      type: 'text',
      name: 'pickupLongitude',
      message: 'Pickup Longitude',
      validate: validateInput
    },
    {
      type: 'text',
      name: 'dropoffLatitude',
      message: 'Dropoff Latitude',
      validate: validateInput
    },
    {
      type: 'text',
      name: 'dropoffLongitude',
      message: 'Dropoff Latitude',
      validate: validateInput
    },
    {
      type: 'number',
      name: 'no_of_passengers',
      message: "Number of Passengers"
    }
  ];
 
 return prompts(questions) as PromptResponse;
};


