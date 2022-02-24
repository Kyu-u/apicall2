import React, { useState, useEffect, ReactElement } from "react";
import { makeRequest } from "../services/index";
import UserModal from "../components/Modal";
import { IUserContent, IUserData, IUserResponse } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { Icon, Table, Button } from "semantic-ui-react";
import { userUrl } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers, setUserForm } from "../redux/actions";
import { RootType } from "../redux/reducers/RootReducer";
const Users = () => {
  const loading = useSelector((state: RootType) => state.user.loading);
  const dispatch = useDispatch();
  const users = useSelector((state: RootType) => state.user.users);
  // const content = useSelector((state: RootType) => state.userModal.content);
  // const open = useSelector((state: RootType) => state.userModal.isOpen);
  // const isLoading =;
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [block, setBlock] = useState<boolean>(false);
  const [userList, setUserList] = useState<IUserData[]>([]);
  const [content, setContent] = useState<IUserContent>({
    name: "",
    id: 0,
  });

  // const onOpenModal = (content: IUserContent) => {
  //   dispatch(openUserModal(content))
  // }

  // const onCloseModal = () => {
  //   dispatch(closeUserModal)
  // }

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers(userUrl));
    }
  }, []);
  // function goToCreate() {
  //   navigate("create");
  // }
  // function goToPosts(user) {
  //   navigate(`${user.id}/posts`, { state: user });
  // }
  // function goToEdit(user) {
  //   navigate(`${user.id}`, { state: user });
  // }
  function navigateToPage(path: string, user?: IUserData) {
    if (user) navigate(path, { state: user });
    else navigate(path);
  }
  // const handleDelete = async (id: number) => {
  //   try {
  //     setBlock(true);

  //     const response = await makeRequest(`${userUrl}/${id}`, "delete");
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setBlock(false);
  //   }
  // };
  function toggleOpen() {
    setOpen(!open);
  }
  function generateContent(): ReactElement {
    return (
      <div>
        <p>{content.id}</p>
        <p>{content.name}</p>
      </div>
    );
  }
  function deleteUser() {
    const temp = users.filter((user) => user.id !== content.id);
    // console.log(temp);
    dispatch(setUsers(temp));
  }
  // function handleModalButton(content, id) {
  //   // setContent(content);
  //   // setContent({...content, id: id });
  //   toggleOpen();
  // }
  const tableRows = users.map((user: IUserData, i: number): ReactElement => {
    const delButtonId = `delete-button-${user.id}`;
    const editButtonId = `edit-button-${user.id}`;
    const infoButtonId = `info-button-${user.id}`;
    // const {  } = user;
    return (
      <Table.Row className="" key={`user${i}`}>
        <Table.Cell className="tablecell">{user.name}</Table.Cell>
        <Table.Cell className="tablecell">{user.email}</Table.Cell>
        <Table.Cell className="actioncell">
          {/* <Link
            to={{
              pathname: `${user.id}`,
              // state: user,
            }}
            replace state={user}
          >
            {" "}
            <Button
              size="mini"
              icon
              color="yellow"
              onClick={() =>console.log(user)}
            >
              <Icon name="edit"></Icon>
            </Button>
          </Link> */}
          <Button
            data-testid={editButtonId}
            size="mini"
            icon
            color="yellow"
            onClick={() => {
              navigateToPage(`${user.id}`, user);

              dispatch(
                setUserForm({ id: user.id, name: user.name, email: user.email })
              );
            }}
          >
            <Icon name="edit" />
          </Button>

          <Button
            data-testid={infoButtonId}
            icon
            size="mini"
            color="grey"
            onClick={() => {
              navigateToPage(`${user.id}/posts`, user);
            }}
          >
            <Icon name="info" />
          </Button>
          <Button
            data-testid={delButtonId}
            icon
            size="mini"
            onClick={() => {
              // const temp = (
              //   <div>
              //     <p>{user.id}</p>
              //     <p>{user.name}</p>
              //   </div>
              // );

              setContent({ ...content, name: user.name, id: user.id });
              // handleModalButton(temp);
              toggleOpen();
              // onOpenModal({name: user.name, id:user.id})
            }}
          >
            <Icon name="delete" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  });
  if (loading) {
    return (
      <div>
        Please wait
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </div>
    );
  }
  return (
    <div className="container">
      <UserModal
        // user={user}
        title={"Delete User"}
        content={generateContent()}
        isOpen={open}
        toggleOpen={toggleOpen}
        handleDelete={deleteUser}
        // resource="user"
      />
      <h1>Users</h1>
      <Table celled>
        <Table.Header>
          <Table.Row className="tableheader">
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell className="tableheader">Email</Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              width={"two"}
              className="tableheader"
            >
              Action
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{tableRows}</Table.Body>
      </Table>
      <Button data-testid="addbutton"
        color="green"
        icon
        onClick={() => navigateToPage("/users/create")}
      >
        <Icon name="add" />
      </Button>
    </div>
  );
};

export default Users;
