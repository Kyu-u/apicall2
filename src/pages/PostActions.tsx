import React, { ChangeEvent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { makeRequest } from "../services";
import { postUrl } from "../constants";
import { IPostContent, IPostData } from "../interfaces";
import { Method } from "axios";
import { setPostForm, setPosts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../redux/reducers/RootReducer";
export default function PostActions() {
  const dispatch = useDispatch();
  const postFormData = useSelector((state: RootType) => state.postFormData);
  const posts = useSelector((state: RootType) => state.post.posts);
  const params = useParams();
  const { id, postId } = params;
  const [block, setBlock] = useState<boolean>(false);

  // console.log(postId);
  const location = useLocation();
  // const postUrl = "https://jsonplaceholder.typicode.com/posts";
  // console.log('location', location);
  // const [post, setPost] = useState<IPostData>({
  //   title: "",
  //   body: "",
  //   id: 0,
  // });
  // console.log(post2);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const temp = {
    //   ...post,
    //   [e.target.name]: e.target.value,
    // };
    // setPost(temp);
    dispatch(setPostForm({ ...postFormData, [e.target.name]: e.target.value }));
  };

  // const handleEdit = async () => {
  //   try {
  //     setBlock(true);

  //     const response = await editData(`${postUrl}/${postId}`, post);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setBlock(false);

  //   }
  // };

  // const handleSubmit = async () => {

  //   // console.log(post);
  //   try {
  //     setBlock(true);

  //     const response = await postData(`${postUrl}?userId=${id}`, {post});
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setBlock(false);

  //   }
  // };

  const handleRequest = async (
    url: string,
    method: Method,
    data: IPostData
  ) => {
    try {
      setBlock(true);
      const response = await makeRequest<IPostData>(url, method, data);
      console.log(response);
      if (method === "put") {
        const temp = posts.map((post) =>
          post.id === postFormData.id
            ? { ...post, title: postFormData.title, body: postFormData.body }
            : post
        );
        dispatch(setPosts(temp));
      }
      if (method === "post") {
        const temp = [
          ...posts,
          postFormData,
        ];
        dispatch(setPosts(temp));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBlock(false);
    }
  };

  if (block) return <div>Please wait</div>;

  if (postId) {

    return (
      <div className="container">
        <h1>Edit Post</h1>
        <h2>{postFormData.title}</h2>
        <Form>
          <FormField>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={postFormData.title}
              name="title"
              id=""
            />
          </FormField>
          <FormField>
            <label htmlFor="name">Body</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={postFormData.body}
              name="body"
              id=""
            />
          </FormField>
          <Button
            type="button"
            onClick={() => handleRequest(`${postUrl}/${postId}`, "put", postFormData)}
          >
            Update
          </Button>
        </Form>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Create Post</h1>
      <Form>
        <FormField>
          <label htmlFor="name">Title</label>
          <input type="text" onChange={handleChange} name="title" id="" />
        </FormField>
        <FormField>
          <label htmlFor="name">Body</label>
          <input type="text" onChange={handleChange} name="body" id="" />
        </FormField>
        <Button
          type="button"
          onClick={() => handleRequest(`${postUrl}?userId=${id}`, "post", postFormData)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
