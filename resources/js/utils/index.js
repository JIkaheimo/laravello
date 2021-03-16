export * as actions from "./actions";

export const capitalized = (str) =>
  str.slice(0, 1).toUpperCase() + str.slice(1);
