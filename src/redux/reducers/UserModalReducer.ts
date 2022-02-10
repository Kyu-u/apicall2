import { IUserContent } from "../../interfaces";
import { UserModalActions, UserModalTypes } from "../types/UserModalTypes";

interface IState {
  content: IUserContent;
  isOpen: boolean;
}

const initialState = {
  content: {
    id: 0,
    name: "",
  },
  isOpen: false,
};

export function UserModalReducer(state: IState = initialState, action: UserModalActions) {
  switch (action.type) {
    case UserModalTypes.OPEN:
      return { ...state, content: action.payload, isOpen: true }

    case UserModalTypes.CLOSE:
      return {...state, isOpen: !state.isOpen}
    default:
      return {...state}
  }
}