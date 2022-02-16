import { ICommentState } from "../../interfaces";
import { CommentActions, CommentActionTypes } from "../types/CommentActionTypes";

const initialState = {
  comments: [],
  loading: false,
};

export function CommentReducer(state: ICommentState = initialState, action: CommentActions) {
  switch (action.type) {
    case CommentActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case CommentActionTypes.GET_COMMENT:
      return { ...state, comments: action.payload };
    case CommentActionTypes.SET_COMMENT:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
}
