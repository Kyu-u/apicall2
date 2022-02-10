import { Method } from "axios";
import { Dispatch } from "redux";
import { IUserContent, IUserData } from "../../interfaces";
import { makeRequest } from "../../services";
import { UserActionTypes } from "../types/UserActionTypes";
import { UserActions } from "../types/UserActionTypes";
import { UserModalActions, UserModalTypes } from "../types/UserModalTypes";

const actionStart = (): UserActions => ({
  type: UserActionTypes.LOADING,
});

const actionSuccess = (): UserActions => ({
  type: UserActionTypes.SUCCESS,
});

export const getUsers =
  (url: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(actionStart());
      const data = await makeRequest<IUserData[]>(url, "get");
      dispatch({
        type: UserActionTypes.GET_USER,
        payload: data,
      });
      dispatch(actionSuccess());
    } catch (error) {}
  };

export const openUserModal = (content: IUserContent): UserModalActions => ({
  type: UserModalTypes.OPEN,
  payload: content
})

export const closeUserModal = (): UserModalActions => ({
  type: UserModalTypes.CLOSE
})

