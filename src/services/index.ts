
import axios, { Method } from "axios";
import { ICommentData, IPostData, IUserData, IUserResponse } from "../interfaces";
import { AxiosResponse } from "axios";


export async function makeRequest<T>(url: string, method: Method, data?: IUserData | IPostData | ICommentData):Promise<T> {
  const res = await axios({
    method,
    url,
    data: data,
  });

  return res.data;
}


