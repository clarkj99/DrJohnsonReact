import login from "./login";
import encounter from "./encounter";

import { combineReducers } from "redux";

export default combineReducers({
  login: login,
  encounter: encounter
});
