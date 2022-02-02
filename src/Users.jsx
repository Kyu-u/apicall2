import React, { useState, useEffect } from "react";
import { getData } from "./services/index";
import UserModal from "./UserModal";

import { useNavigate, Link } from "react-router-dom";
import {
  Icon,

  Table,
  Button,

} from "semantic-ui-react";

// import 'semantic-ui-css/semantic.min.css'
const Users = () => {
  const navigate = useNavigate();
  const [block, setBlock] = useState(false);
  const [userList, setUserList] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/users";
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
    navigate(`create`);
  }

  function goToEdit(user) {
    navigate(`${user.id}`, { state: user });
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

          <UserModal user = {user}></UserModal>

        </Table.Cell>
      </Table.Row>
    );
  });
  if (block) {
    return <div>Please wait</div>;
  } else
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
          <Icon name="add"></Icon>
        </Button>
      </div>
    );
};

export default Users;
