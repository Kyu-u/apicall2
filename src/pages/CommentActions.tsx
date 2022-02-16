import React, { ChangeEvent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { makeRequest } from "../services";
import { commentUrl } from "../constants";
import { ICommentData } from "../interfaces";
import { Method } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../redux/reducers/RootReducer";
import { setCommentForm, setComments } from "../redux/actions";
export default function CommentActions() {
  const dispatch = useDispatch();
  const commentFormData = useSelector(
    (state: RootType) => state.commentFormData
  );

  const comments = useSelector((state: RootType) => state.comment.comments);
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
    // const temp = {
    //   ...comment,
    //   [e.target.name]: e.target.value,
    // };
    // setComment(temp);
    dispatch(
      setCommentForm({ ...commentFormData, [e.target.name]: e.target.value })
    );
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
      const response = await makeRequest<ICommentData>(url, method, data);
      console.log(response);
      const temp = comments.map((comment) =>
        comment.id === commentFormData.id
          ? {
              ...comment,
              name: commentFormData.name,
              body: commentFormData.body,
            }
          : comment
      );
      console.log(temp);
      dispatch(setComments(temp));
    } catch (error) {
      console.log(error);
    } finally {
      setBlock(false);
    }
  };
  return (
    <div className="container">
      <h1>Edit Comment</h1>
      <Form>
        <FormField>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleChange}
            defaultValue={commentFormData.name}
            name="name"
            id=""
          />
        </FormField>
        <FormField>
          <label htmlFor="name">Body</label>
          <input
            type="text"
            onChange={handleChange}
            defaultValue={commentFormData.body}
            name="body"
            id=""
          />
        </FormField>
        <Button
          type="submit"
          onClick={() =>
            handleRequest(`${commentUrl}/${params.id}`, "put", commentFormData)
          }
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
