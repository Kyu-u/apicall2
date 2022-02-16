import { IPostData } from "../../interfaces";
import { PostActions, PostActionTypes } from "../types/PostActionTypes";

const initialState = {
  id: 0,
  title: "",
  body: "",
};

export function PostFormReducer(
  state: IPostData = initialState,
  action: PostActions
) {
  switch (action.type) {
    case PostActionTypes.SET_POST_FORM:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
      };
    default:
      return state;
  }
}
