import { LOGIN, LOGOUT } from "./action";

const INITIAL_STATE = { loggedIn: false, waitingUser: true, user: undefined };

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
