import React, { useState, useEffect } from "react";
import { getData, deleteData } from "../services/index";
import UserModal from "../components/Modal";

import { useNavigate, Link } from "react-router-dom";
import { Icon, Table, Button, Menu, Segment, Sidebar } from "semantic-ui-react";
import { userUrl } from "../constants";
const Users = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [userList, setUserList] = useState([]);
  const [content, setContent] = useState({});

  // function handleYes() {
  //   setOpen(!open);
  // }
  // function handleNo() {
  //   setOpen(!open)
  // }

  async function fetchData() {
    try {
      setBlock(true);
      const temp = await getData(userUrl);
      setUserList(temp.data);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
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
  function navigateToPage(path, user) {
    if (user) navigate(path, { state: user });
    else navigate(path);
  }
  const handleDelete = async (id) => {
    try {
      setBlock(true);

      const response = await deleteData(`${userUrl}/${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setBlock(false);
    }
  };
  function toggleOpen() {
    setOpen(!open);
  }
  // function handleModalButton(content, id) {
  //   // setContent(content);
  //   // setContent({...content, id: id });
  //   toggleOpen();
  // }
  const tableRows = userList.map((user, i) => {
    // const {  } = user;
    return (
      <Table.Row className="" key={`user${i}`}>
        <Table.Cell className="tablecell">{user.name}</Table.Cell>
        <Table.Cell className="tablecell">{user.email}</Table.Cell>
        <Table.Cell verticalAlign="" className="actioncell">
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
            size="mini"
            icon
            color="yellow"
            onClick={() => navigateToPage(`${user.id}`, user)}
          >
            <Icon name="edit" />
          </Button>

          <Button
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
            icon
            size="mini"
            onClick={() => {
              const temp = (
                <div>
                  <p>{user.id}</p>
                  <p>{user.name}</p>
                </div>
              );

              setContent({ ...temp, id: user.id });
              // handleModalButton(temp);
              toggleOpen();
            }}
          >
            <Icon name="delete" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  });
  if (block) {
    return <div>Please wait</div>;
  }
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
      >
        <Menu.Item as="a">
          <Icon name="user" />
          Users
        </Menu.Item>
        <Menu.Item onClick={() => navigate('/comments', {replace: true})} as="a">
          <Icon name="comment" />
          Comments
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <div className="container">
            <UserModal
              // user={user}
              title={"Delete User"}
              content={`Are you sure you want to delete user ${content.id}?`}
              isOpen={open}
              toggleOpen={toggleOpen}
              handleDelete={() => handleDelete(content.id)}
              resource="user"
            />
            <h1>Users</h1>
            <Table celled>
              <Table.Header>
                <Table.Row className="tableheader">
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell className="tableheader">
                    Email
                  </Table.HeaderCell>
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
            <Button color="green" icon onClick={() => navigateToPage("/users/create")}>
              <Icon name="add" />
            </Button>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Users;
