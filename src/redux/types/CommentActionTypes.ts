import { ICommentData } from "../../interfaces";

export enum CommentActionTypes {
  LOADING = "loading",
  GET_COMMENT = "getcomment",
  SET_COMMENT = 'setcomment',
  SET_COMMENT_FORM = 'setcommentform'
}
interface GetCommentAction {
  type: "getcomment";
  payload: ICommentData[];
}

interface Loading {
  type: "loading";
  payload: boolean;
}

interface SetCommentAction {
  type: 'setcomment',
  payload: ICommentData[]
}

interface SetCommentFormAction {
  type: 'setcommentform',
  payload: ICommentData
}


export type CommentActions =
  | GetCommentAction
  | Loading
  | SetCommentAction
  | SetCommentFormAction
