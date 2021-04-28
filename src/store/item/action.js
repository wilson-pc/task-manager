export const SET_ITEMS = "SET_ITEMS";
export const REMOVE_ITEMS = "REMOVE_ITEMS";

export function seItems(data) {
  return { type: SET_ITEMS, payload: data };
}
export function removeItems() {
  return { type: REMOVE_ITEMS };
}
