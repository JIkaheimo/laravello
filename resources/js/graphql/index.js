export { default as GetBoard } from "./BoardWithListsAndCards.gql";
export { default as AddCard } from "./CardAdd.gql";
export { default as RemoveCard } from "./CardRemove.gql";
export { default as UpdateCard } from "./CardUpdate.gql";

export const copify = (data) => JSON.parse(JSON.stringify(data));
