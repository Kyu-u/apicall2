import { IPostState } from "../../interfaces";
import { PostActions, PostActionTypes } from "../types/PostActionTypes";

const initialState = {
  posts: [],
  loading: false,
};

export function PostReducer(state: IPostState = initialState, action: PostActions) {
  switch (action.type) {
    case PostActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case PostActionTypes.GET_POST:
      return { ...state, posts: action.payload };
    case PostActionTypes.SET_POST:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
}
