import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import EmpleadoReducer from "./empleadoReducer";

export default combineReducers({
  user: UserReducer,
  empleado: EmpleadoReducer,
});
