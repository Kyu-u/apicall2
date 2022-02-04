import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { postData, editData } from "../services";
import { userUrl } from "../constants";
export default function UserActions() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  // const userUrl = "https://jsonplaceholder.typicode.com/users";
  const [user, setUser] = useState({});
  const [block, setBlock] = useState(false);

  const {name,username,email,phone} = location.state;
  // console.log(user2);
  const handleChange = (e) => {
    const temp = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(temp);
  };

  const handleEdit = async () => {
    try {
      setBlock(true);
      const response = await editData(`${userUrl}/${params.id}`, user);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setBlock(false);
    }
  };

  const handleSubmit = async () => {
    // console.log(user);
    try {
      setBlock(true);

      const response = await postData(userUrl, user);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setBlock(false);

    }
  };

  if (block) {
    return(<div>Please wait</div>)
  }

  if (params.id) {
    return (
      <div className="container">
        <h1>Edit User</h1>
        <h2>{name}</h2>
        <Form>
          <FormField>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleChange} defaultValue={name} name="name" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Username</label>
            <input type="text" onChange={handleChange} defaultValue={username} name="username" id="" />
          </FormField>  
          <FormField>
            <label htmlFor="name">Email</label>
            <input type="text" onChange={handleChange} defaultValue={email} name="email" id="" />
          </FormField>
          <FormField>
            <label htmlFor="name">Phone</label>
            <input type="text" onChange={handleChange} defaultValue={phone} name="phone" id="" />
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
