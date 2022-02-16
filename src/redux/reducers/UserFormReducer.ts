import { IUserData, IUserFormData } from "../../interfaces";
import { UserActions, UserActionTypes } from "../types/UserActionTypes";

const initialState = {
  id: 0,
  name: "",
  email: "",
};

export function UserFormReducer(
  state: IUserData = initialState,
  action: UserActions
) {
  switch (action.type) {
    case UserActionTypes.SET_USER_FORM:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    default:
      return state;
  }
}
