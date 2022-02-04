import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { commentData, editData } from "../services";
import { commentUrl } from "../constants";
export default function CommentActions() {
  const params = useParams();
  const location = useLocation();
  const [block, setBlock] = useState(false);

  // const commentUrl = "https://jsonplaceholder.typicode.com/comments";
  // console.log('location', location);
  const [comment, setComment] = useState({});
  const { name, body } = location.state;
  // console.log(comment2);
  const handleChange = (e) => {
    const temp = {
      ...comment,
      [e.target.name]: e.target.value,
    };
    setComment(temp);
  };

  const handleEdit = async () => {
    try {
      setBlock(true);

      const response = await editData(`${commentUrl}/${params.id}`, comment);
      console.log(response);
    } catch (error) {
      console.error(error);
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
        <Button type="submit" onClick={handleEdit}>
          Update
        </Button>
      </Form>
    </div>
  );
}
