import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { postData, editData } from "../services";
import { postUrl } from "../constants";
export default function PostActions() {
  const params = useParams();
  const { id, postId } = params;
  const [block, setBlock] = useState(false);

  // console.log(postId);
  const location = useLocation();
  // const postUrl = "https://jsonplaceholder.typicode.com/posts";
  // console.log('location', location);
  const [post, setPost] = useState({});
  // console.log(post2);
  const handleChange = (e) => {
    const temp = {
      ...post,
      [e.target.name]: e.target.value,
    };
    setPost(temp);
  };

  const handleEdit = async () => {
    try {
      setBlock(true);

      const response = await editData(`${postUrl}/${postId}`, post);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setBlock(false);

    }
  };

  const handleSubmit = async () => {

    // console.log(post);
    try {
      setBlock(true);

      const response = await postData(`${postUrl}?userId=${id}`, {post});
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setBlock(false);

    }
  };

  if(block) return(<div>Please wait</div>)

  if (postId) {
    const { title, body } = location.state;

    return (
      <div className="container">
        <h1>Edit Post</h1>
        <h2>{title}</h2>
        <Form>
          <FormField>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={title}
              name="title"
              id=""
            />
          </FormField>
          <FormField>
            <label htmlFor="name">Body</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={body}
              name="body"
              id=""
            />
          </FormField>
          <Button type="submit" onClick={handleEdit}>
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
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
