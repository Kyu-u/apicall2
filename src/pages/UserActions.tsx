import React, { ChangeEvent, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FormField, Form, Button } from "semantic-ui-react";
import { makeRequest } from "../services";
import { userUrl } from "../constants";
import { IUserData, IUserFormData } from "../interfaces";
import { Method } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../redux/reducers/RootReducer";
import { setUserForm, setUsers } from "../redux/actions";
export default function UserActions() {
  const dispatch = useDispatch();
  const userFormData = useSelector((state: RootType) => state.userFormData);
  const users = useSelector((state: RootType) => state.user.users);

  // const state = location.state as IUserState;
  // console.log(state);
  const params = useParams();
  // const userUrl = "https://jsonplaceholder.typicode.com/users";
  // const [user, setUser] = useState<IUserData>({
  //   id: 0,
  //   name: "",
  //   email: "",
  // });
  const [block, setBlock] = useState<boolean>(false);

  // console.log(user2);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const temp = {
    //   ...userFormData,
    //   [e.target.name]: e.target.value,
    // };
    // console.log(temp);
    dispatch(setUserForm({ ...userFormData, [e.target.name]: e.target.value }));
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
      if (method === "put") {
        const temp = users.map((user) =>
          user.id === userFormData.id
            ? { ...user, name: userFormData.name, email: userFormData.email }
            : user
        );
        dispatch(setUsers(temp));
      }
      if (method === "post") {
        const temp = [...users, userFormData];
        dispatch(setUsers(temp));
      }
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
        <h2>{userFormData.name}</h2>
        <Form>
          <FormField>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={userFormData.name}
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
              defaultValue={userFormData.email}
              name="email"
              id=""
            />
          </FormField>

          <Button
            type="button"
            onClick={() =>
              handleRequest(`${userUrl}/${params.id}`, "put", userFormData)
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
          onClick={() => handleRequest(userUrl, "post", userFormData)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
