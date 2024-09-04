import { numRegex, emailRegex } from "./regex";

export const isEmpty = (value) => value.trim().length !== 0;
export const isNumber = (value) => numRegex.test(value);
export const isEmail = (value) => emailRegex.test(value);
