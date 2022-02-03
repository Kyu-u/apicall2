import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { postData, editData } from "../services";
export default function UserActions() {
  const params = useParams();
  const location = useLocation();
  const url = "https://jsonplaceholder.typicode.com/users";
  // console.log('location', location);
  const [user, setUser] = useState({});
  const user2 = location.state;
  console.log(user2);
  const handleChange = (e) => {
    const temp = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(temp);
  };

  const handleEdit = async () => {

    try {
      const response = await editData(`${url}/${params.id}`, user);
      console.log(response);
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async () => {
    // console.log(user);
    try {
      const response = await postData(url, user);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (params.id) {
    return (
      <div className="container">
        <h1>Edit User</h1>
        <h2>{user2.name}</h2>
        <Form>
          <FormField>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleChange} name="name" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Username</label>
            <input type="text" onChange={handleChange} name="username" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Email</label>
            <input type="text" onChange={handleChange} name="email" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Phone</label>
            <input type="text" onChange={handleChange} name="phone" id="" />
          </FormField>
          <Button type="submit" onClick={handleEdit}>Update</Button>
        </Form>
      </div>
    );
  } else
    return (
      <div className="container">
        <h1>Create User</h1>
        <Form>
          <FormField>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleChange} name="name" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Username</label>
            <input type="text" onChange={handleChange} name="username" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Email</label>
            <input type="text" onChange={handleChange} name="email" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Phone</label>
            <input type="text" onChange={handleChange} name="phone" id="" />
          </FormField>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
}
