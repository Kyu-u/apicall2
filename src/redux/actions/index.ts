import { Method } from "axios";
import { Dispatch } from "redux";
import { IUserContent, IUserData } from "../../interfaces";
import { makeRequest } from "../../services";
import { UserActionTypes } from "../types/UserActionTypes";
import { UserActions } from "../types/UserActionTypes";

const loading = (isLoading: boolean): UserActions => ({
  type: UserActionTypes.LOADING,
  payload: isLoading,
})
export const getUsers =
  (url: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(loading(true));
      const data = await makeRequest<IUserData[]>(url, "get");
      dispatch({
        type: UserActionTypes.GET_USER,
        payload: data,
      });
      dispatch(loading(false));
    } catch (error) {}
  };

export const setUsers = (userArray: IUserData[]): UserActions => ({
  type: UserActionTypes.SET_USER,
  payload: userArray
})

