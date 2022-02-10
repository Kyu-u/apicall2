import { IUserData } from "../../interfaces";

export enum UserActionTypes {
  LOADING = "loading",
  SUCCESS = 'success',
  GET_USER = "getuser",
  ADD_USER = "adduser",
  DELETE_USER = "deleteuser",
}
interface GetUserAction {
  type: "getuser";
  payload: IUserData[];
}
interface AddUserAction {
  type: "adduser";
}
interface DeleteUserAction {
  type: "deleteuser";
}
interface Loading {
  type: "loading";
}

interface Success {
  type: "success";
}

export type UserActions =
  | GetUserAction
  | AddUserAction
  | DeleteUserAction
  | Loading
  | Success;
