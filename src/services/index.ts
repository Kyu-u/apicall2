
import axios, { Method } from "axios";
import { ICommentData, IPostData, IUserData } from "../interfaces";
import { TMethods } from "../types";

export async function getData(url: string) {
  return await axios.get(url);
}

export async function postData(url: string, data: IUserData) {
  return await axios({
    method: 'post',
    url,
    data: data,
  });
}

export async function deleteData(url: string) {
  return axios.delete(url);
}

export async function editData(url: string, data: IUserData) {
  return await axios({
    method: 'put',
    url,
    data: data,
  });
}

export async function makeRequest(url: string, method: Method, data: IUserData | IPostData | ICommentData) {
  return await axios({
    method,
    url,
    data: data,
  });
}


