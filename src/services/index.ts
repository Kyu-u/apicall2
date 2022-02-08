
import axios, { Method } from "axios";
import { ICommentData, IPostData, IUserData, IUserResponse } from "../interfaces";


export async function makeRequest(url: string, method: Method, data?: IUserData | IPostData | ICommentData) {
  return await axios({
    method,
    url,
    data: data,
  });
}


