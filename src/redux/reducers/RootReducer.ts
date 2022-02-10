import { combineReducers } from "redux";
import { UserModalReducer } from "./UserModalReducer";
import { UserReducer } from "./UserReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
  userModal : UserModalReducer
})

export type RootType = ReturnType<typeof RootReducer>