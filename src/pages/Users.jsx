import React, { useState, useEffect } from "react";
import { getData, deleteData } from "../services/index";
import UserModal from "../components/Modal";

import { useNavigate, Link } from "react-router-dom";
import { Icon, Table, Button } from "semantic-ui-react";
const Users = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [userList, setUserList] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/users";
  // function handleYes() {
  //   setOpen(!open);
  // }
  // function handleNo() {
  //   setOpen(!open)
  // }

  async function fetchData() {
    try {
      setBlock(true);
      const temp = await getData(url);
      setUserList(temp.data);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
    console.log(userList);
  }, []);
  function goToCreate() {
    navigate("create");
  }

  function goToEdit(user) {
    navigate(`${user.id}`, { state: user });
  }
  const handleDelete = async (id) => {
    const response = await deleteData(`${url}/${id}`);
    console.log(response);
  };
  function toggleOpen() {
    setOpen(!open);
  }
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
            onClick={() => goToEdit(user)}
          >
            <Icon name="edit"></Icon>
          </Button>

          <UserModal
            // user={user}
            title={"Delete User"}
            content={`Are you sure you want to delete user ${user.id}?`}
            isOpen={open}
            toggleOpen={toggleOpen}
            handleDelete={() => handleDelete(user.id)}
            resource="user"
          />
        </Table.Cell>
      </Table.Row>
    );
  });
  if (block) {
    return <div>Please wait</div>;
  }
  return (
    <div className="container">
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
      <Button color="green" icon onClick={goToCreate}>
        <Icon name="add" />
      </Button>
    </div>
  );
};

export default Users;
