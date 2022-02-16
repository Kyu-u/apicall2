import { ICommentData } from "../../interfaces";
import {
  CommentActions,
  CommentActionTypes,
} from "../types/CommentActionTypes";

const initialState = {
  id: 0,
  postId: 0,
  name: "",
  body: "",
};

export function CommentFormReducer(
  state: ICommentData = initialState,
  action: CommentActions
) {
  switch (action.type) {
    case CommentActionTypes.SET_COMMENT_FORM:
      return {
        ...state,
        id: action.payload.id,
        postId: action.payload.postId,
        name: action.payload.name,
        body: action.payload.body,
      };
    default:
      return state;
  }
}
