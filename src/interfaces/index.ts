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
  name: string;
  email: string;
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

