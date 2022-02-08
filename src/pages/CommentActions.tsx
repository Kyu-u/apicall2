import React, { ChangeEvent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import {  makeRequest } from "../services";
import { commentUrl } from "../constants";
import { ICommentData } from "../interfaces";
import { Method } from "axios";
export default function CommentActions() {
  const params = useParams();
  const location = useLocation();
  const [block, setBlock] = useState<boolean>(false);

  // const commentUrl = "https://jsonplaceholder.typicode.com/comments";
  // console.log('location', location);
  const [comment, setComment] = useState<ICommentData>({
    id: 0,
    postId: 0,
    name: "",
    body: "",
  });
  const { name, body } = location.state as ICommentData;
  // console.log(comment2);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = {
      ...comment,
      [e.target.name]: e.target.value,
    };
    setComment(temp);
  };

  // const handleEdit = async () => {
  //   try {
  //     setBlock(true);

  //     const response = await editData(`${commentUrl}/${params.id}`, comment);
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
    data: ICommentData
  ) => {
    try {
      setBlock(true);
      const response = await makeRequest(url, method, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setBlock(false);
    }
  };
  return (
    <div className="container">
      <h1>Edit Comment</h1>
      <h2>{name}</h2>
      <Form>
        <FormField>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleChange}
            defaultValue={name}
            name="name"
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
        <Button
          type="submit"
          onClick={() =>
            handleRequest(`${commentUrl}/${params.id}`, "put", comment)
          }
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
