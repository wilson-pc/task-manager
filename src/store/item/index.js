import { SET_ITEMS, REMOVE_ITEMS } from "./action";

const INITIAL_STATE = {
  PENDING: {
    name: "To do",
    items: [],
  },
  IN_PROGRESS: {
    name: "In Progress",
    items: [],
  },
  DONE: {
    name: "Done",
    items: [],
  },
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.payload;
    case REMOVE_ITEMS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
