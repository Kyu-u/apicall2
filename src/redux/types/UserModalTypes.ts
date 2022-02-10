import { IUserContent } from "../../interfaces";

export enum UserModalTypes {
  OPEN = 'open',
  CLOSE = 'close'
}

interface OpenModal {
  type: 'open',
  payload: IUserContent
}

interface CloseModal {
  type: 'close',
}


export type UserModalActions = OpenModal | CloseModal