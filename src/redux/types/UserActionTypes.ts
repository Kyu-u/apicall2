import { IUserData, IUserFormData } from "../../interfaces";

export enum UserActionTypes {
  LOADING = "loading",
  GET_USER = "getuser",
  SET_USER = 'setuser',
  SET_USER_FORM = 'setuserform'
}
interface GetUserAction {
  type: "getuser";
  payload: IUserData[];
}

interface Loading {
  type: "loading";
  payload: boolean;
}

interface SetUserAction {
  type: 'setuser',
  payload: IUserData[]
}

interface SetUserFormAction {
  type: 'setuserform',
  payload: IUserData
}


export type UserActions =
  | GetUserAction
  | Loading
  | SetUserAction
  | SetUserFormAction
