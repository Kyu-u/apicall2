import React, { ChangeEvent, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { makeRequest } from "../services";
import { userUrl } from "../constants";
import { IUserData, IUserState } from "../interfaces";
import { Method } from "axios";
export default function UserActions() {
  const location = useLocation();
  const state = location.state as IUserState;
  // console.log(state);
  const params = useParams();
  // const userUrl = "https://jsonplaceholder.typicode.com/users";
  const [user, setUser] = useState<IUserData>({
    id: 0,
    name: "",
    email: "",
  });
  const [block, setBlock] = useState<boolean>(false);

  // console.log(user2);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(temp);
  };

  // const handleEdit = async () => {
  //   try {
  //     setBlock(true);
  //     const response = await editData(`${userUrl}/${params.id}`, user);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setBlock(false);
  //   }
  // };

  // const handleSubmit = async () => {
  //   // console.log(user);
  //   try {
  //     setBlock(true);
  //     const response = await postData(userUrl, user);
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
    data: IUserData
  ) => {
    try {
      setBlock(true);
      const response = await makeRequest<IUserData>(url, method, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setBlock(false);
    }
  };

  if (block) {
    return <div>Please wait</div>;
  }

  if (params.id) {
    // const  = location.state;

    return (
      <div className="container">
        <h1>Edit User</h1>
        <h2>{state.name}</h2>
        <Form>
          <FormField>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={state.name}
              name="name"
              id=""
            />
          </FormField>
          {/* <FormField>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={username}
              name="username"
              id=""
            />
          </FormField> */}
          <FormField>
            <label htmlFor="name">Email</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={state.email}
              name="email"
              id=""
            />
          </FormField>

          <Button
            type="button"
            onClick={() =>
              handleRequest(`${userUrl}/${params.id}`, "put", user)
            }
          >
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
          <label htmlFor="name">Email</label>
          <input type="text" onChange={handleChange} name="email" id="" />
        </FormField>

        <Button
          type="button"
          onClick={() => handleRequest(userUrl, "post", user)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
