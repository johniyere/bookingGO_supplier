import {PromptObject} from "prompts";
import prompts from "prompts";

export function askQuestions() {
  const questions: PromptObject[] = [
    {
      type: 'text',
      name: 'pickupLatitude',
      message: 'Pickup Latitude',
    },
    {
      type: 'text',
      name: 'pickupLongitude',
      message: 'Pickup Longitude'
    },
    {
      type: 'text',
      name: 'dropoffLatitude',
      message: 'Dropoff Latitude',
    },
    {
      type: 'text',
      name: 'dropoffLongitude',
      message: 'Dropoff Latitude',
    },
    {
      type: 'number',
      name: 'no_of_passengers',
      message: "Number of Passengers"
    }
  ];
 
 return prompts(questions);
};
