import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
})

export type RootType = ReturnType<typeof RootReducer>