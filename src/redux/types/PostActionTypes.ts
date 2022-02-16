import { IPostData } from "../../interfaces";

export enum PostActionTypes {
  LOADING = "loading",
  GET_POST = "getpost",
  SET_POST = 'setpost',
  SET_POST_FORM = 'setpostform'
}
interface GetPostAction {
  type: "getpost";
  payload: IPostData[];
}

interface Loading {
  type: "loading";
  payload: boolean;
}

interface SetPostAction {
  type: 'setpost',
  payload: IPostData[]
}

interface SetPostFormAction {
  type: 'setpostform',
  payload: IPostData
}


export type PostActions =
  | GetPostAction
  | Loading
  | SetPostAction
  | SetPostFormAction
