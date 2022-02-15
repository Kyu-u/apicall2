import React from "react";
import { IUserData } from "../../interfaces";
import { UserActionTypes } from "../types/UserActionTypes";
import { UserActions } from "../types/UserActionTypes";

export interface IState {
  users: IUserData[];
  loading: boolean;
}

const initialState = {
  users: [],
  loading: false,
};

export function UserReducer(state: IState = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return { ...state, users: action.payload };
    case UserActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case UserActionTypes.SET_USER:
      return {...state, users: action.payload}
    default:
      return state;
  }
}
