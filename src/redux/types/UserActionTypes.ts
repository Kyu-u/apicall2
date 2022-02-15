import { IUserData } from "../../interfaces";

export enum UserActionTypes {
  LOADING = "loading",
  GET_USER = "getuser",
  SET_USER = 'setuser',

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


export type UserActions =
  | GetUserAction
  | Loading
  | SetUserAction
