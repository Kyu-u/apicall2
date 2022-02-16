import { ReactElement } from "react";

export interface IUserData {
  id: number;
  name: string;
  email: string;
}

export interface IUserContent {
  id: number;
  name: string;
}
export interface IUserFormData {
  name: string;
  email: string;
}
export interface IUserState {
  users: IUserData[];
  loading: boolean;
}

export interface IPostData {
  id: number;
  title: string;
  body: string;
}

export interface IPostState {
  posts: IPostData[],
  loading: boolean
}

export interface IPostContent {
  id: number;
  title: string;
  body: string;
}

export interface ICommentData {
  id: number;
  postId: number;
  name: string;
  body: string;
}
export interface ICommentState {
  comments: ICommentData[],
  loading: boolean,
}

export interface IModalProps {
  isOpen: boolean;
  handleDelete(): void;
  content: ReactElement;
  title: string;
  toggleOpen(): void;
}

export interface IPaginatorProps {
  commentAmount: number;
  loadPage(page: number): void;
  activePage: number;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
}

