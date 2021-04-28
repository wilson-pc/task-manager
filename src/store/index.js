import { combineReducers } from "redux";

import auth from "./auth";
import item from "./item";

export default combineReducers({
  auth,
  item,
});
