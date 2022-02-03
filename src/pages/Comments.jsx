import React, { useState, useEffect } from "react";
import { getData } from "../services/index";
import UserModal from "../components/Modal";
import { deleteData } from "../services/index";
import { useNavigate, Link } from "react-router-dom";
import { Icon, Table, Button, Menu } from "semantic-ui-react";
export default function Comments() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [block, setBlock] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/comments";
  async function fetchData() {
    try {
      setBlock(true);
      const temp = await getData(url);
      setCommentList(temp.data);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  function goToCreate() {
    navigate("create");
  }

  function goToEdit(comment) {
    navigate(`${comment.id}`, { state: comment });
  }
  const handleDelete = async (url, id) => {
    const response = await deleteData(`${url}/${id}`);
    console.log(response);
  };
  function toggleOpen() {
    setOpen(!open);
  }
  const tableRows = commentList.map((comment, i) => {
    // const {  } = comment;
    return (
      <Table.Row className="" key={`comment${i}`}>
        <Table.Cell className="tablecell">{comment.id}</Table.Cell>
        <Table.Cell className="tablecell">{comment.postId}</Table.Cell>
        <Table.Cell className="tablecell">{comment.name}</Table.Cell>
        <Table.Cell className="tablecell">{comment.body}</Table.Cell>
        <Table.Cell verticalAlign="" className="actioncell">
          {/* <Link
            to={{
              pathname: `${comment.id}`,
              // state: comment,
            }}
            replace state={comment}
          >
            {" "}
            <Button
              size="mini"
              icon
              color="yellow"
              onClick={() =>console.log(comment)}
            >
              <Icon name="edit"></Icon>
            </Button>
          </Link> */}
          <Button
            size="mini"
            icon
            color="yellow"
            onClick={() => goToEdit(comment)}
          >
            <Icon name="edit"></Icon>
          </Button>

          <UserModal
            content={
              <div>
                <p>{comment.id}</p>
                <p>{comment.title}</p>
                <p>{comment.body}</p>
              </div>
            }
            comment={comment}
            isOpen={open}
            toggleOpen={toggleOpen}
            handleDelete={() => handleDelete(url, comment.id)}
            resource="comment"
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
      <h1>Comments</h1>
      <Table celled>
        <Table.Header>
          <Table.Row className="tableheader">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Post ID</Table.HeaderCell>

            <Table.HeaderCell className="tableheader">Name</Table.HeaderCell>
            <Table.HeaderCell className="tableheader">Body</Table.HeaderCell>

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
        <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
      </Table>
      <Button color="green" icon onClick={goToCreate}>
        <Icon name="add" />
      </Button>
    </div>
  );
}
