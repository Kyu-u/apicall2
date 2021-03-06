import { Method } from "axios";
import { Dispatch } from "redux";
import {
  ICommentData,
  IPostData,
  IUserContent,
  IUserData,
  IUserFormData,
} from "../../interfaces";
import { makeRequest } from "../../services";
import { CommentActions,  CommentActionTypes } from "../types/CommentActionTypes";
import { PostActions, PostActionTypes } from "../types/PostActionTypes";
import { UserActionTypes } from "../types/UserActionTypes";
import { UserActions } from "../types/UserActionTypes";

export const loadingUsers = (isLoading: boolean): UserActions => ({
  type: UserActionTypes.LOADING,
  payload: isLoading,
});
export const getUsers =
  (url: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(loadingUsers(true));
      const data = await makeRequest<IUserData[]>(url, "get");
      dispatch({
        type: UserActionTypes.GET_USER,
        payload: data,
      });
      dispatch(loadingUsers(false));
    } catch (error) {}
  };

export const setUsers = (userArray: IUserData[]): UserActions => ({
  type: UserActionTypes.SET_USER,
  payload: userArray,
});

export const setUserForm = (user: IUserData): UserActions => ({
  type: UserActionTypes.SET_USER_FORM,
  payload: user,
});
export const loadingPosts = (isLoading: boolean): PostActions => ({
  type: PostActionTypes.LOADING,
  payload: isLoading,
});
export const getPosts =
  (url: string) => async (dispatch: Dispatch<PostActions>) => {
    try {
      dispatch(loadingPosts(true));
      const data = await makeRequest<IPostData[]>(url, "get");
      dispatch({
        type: PostActionTypes.GET_POST,
        payload: data,
      });
      dispatch(loadingPosts(false));
    } catch (error) {}
  };

export const setPosts = (userArray: IPostData[]): PostActions => ({
  type: PostActionTypes.SET_POST,
  payload: userArray,
});
export const setPostForm = (post: IPostData): PostActions => ({
  type: PostActionTypes.SET_POST_FORM,
  payload: post,
});

 export const loadingComments = (isLoading: boolean): CommentActions => ({
  type: CommentActionTypes.LOADING,
  payload: isLoading,
});

export const getComments =
  (url: string) => async (dispatch: Dispatch<CommentActions>) => {
    try {
      dispatch(loadingComments(true));
      const data = await makeRequest<ICommentData[]>(url, "get");
      dispatch({
        type: CommentActionTypes.GET_COMMENT,
        payload: data,
      });
      dispatch(loadingComments(false));
    } catch (error) {}
  };
  export const setComments = (commentArray: ICommentData[]): CommentActions => ({
    type: CommentActionTypes.SET_COMMENT,
    payload: commentArray,
  });
  export const setCommentForm = (comment: ICommentData): CommentActions => ({
    type: CommentActionTypes.SET_COMMENT_FORM,
    payload: comment,
  });
  