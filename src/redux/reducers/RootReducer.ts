import { combineReducers } from "redux";
import { CommentFormReducer } from "./CommentFormReducer";
import { CommentReducer } from "./CommentReducer";
import { PostFormReducer } from "./PostFormReducer";
import { PostReducer } from "./PostReducer";
import { UserFormReducer } from "./UserFormReducer";
import { UserReducer } from "./UserReducer";

export const RootReducer = combineReducers({
  user: UserReducer,
  userFormData: UserFormReducer,
  post: PostReducer,
  postFormData: PostFormReducer,
  comment: CommentReducer,
  commentFormData: CommentFormReducer
})

export type RootType = ReturnType<typeof RootReducer>