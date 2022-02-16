import { combineReducers } from "redux";
import { PostFormReducer } from "./PostFormReducer";
import { PostReducer } from "./PostReducer";
import { UserFormReducer } from "./UserFormReducer";
import { UserReducer } from "./UserReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
  userFormData: UserFormReducer,
  post: PostReducer,
  postFormData: PostFormReducer
})

export type RootType = ReturnType<typeof RootReducer>