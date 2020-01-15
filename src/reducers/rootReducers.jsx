import login from "./login";
import encounter from "./encounter";
import steps from "./steps";
import user from "./user";

import { combineReducers } from "redux";

export default combineReducers({
  login: login,
  encounter: encounter,
  steps: steps,
  user: user
});
