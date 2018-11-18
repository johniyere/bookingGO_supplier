import { CustomValidator } from "express-validator/check";

function isInputFloat(value: string) {
  const converterdValue = Number(value);
  return !isNaN(converterdValue);
}

export function validateInput(value: string) {
  const valid = isInputFloat(value)
  return valid ? valid : `Only floats are allowed`
}

export function allInputsProvided(input: any) {
  return 'pickupLatitude' in input &&
  'pickupLongitude' in input &&
  'dropoffLatitude' in input &&
  'dropoffLongitude' in input
}

function isValidLocation(location: string) {
  const res = location.split(',');
  if (res.length != 2) return false;

  return res.every(isInputFloat);
}

export const locationValidator: CustomValidator = (value) => {
  if (!isValidLocation(value))
      throw new Error('Not correct format');

  return true;
}