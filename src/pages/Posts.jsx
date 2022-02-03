import React, { useState, useEffect } from "react";
import { getData } from "../services/index";
import UserModal from "../components/Modal";
import { deleteData } from "../services/index";
import { useNavigate, Link } from "react-router-dom";
import { Icon, Table, Button } from "semantic-ui-react";
export default function Posts() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [block, setBlock] = useState(false);
  const [postList, setPostList] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/posts";
  async function fetchData() {
    try {
      setBlock(true);
      const temp = await getData(url);
      setPostList(temp.data);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
    console.log(postList);
  }, []);
  function goToCreate() {
    navigate("create");
  }

  function goToEdit(post) {
    navigate(`${post.id}`, { state: post });
  }
  const handleDelete = async (url, id) => {
    const response = await deleteData(`${url}/${id}`);
    console.log(response);
  };
  function toggleOpen() {
    setOpen(!open);
  }
  const tableRows = postList.map((post, i) => {
    // const {  } = post;
    return (
      <Table.Row className="" key={`post${i}`}>
        <Table.Cell className="tablecell">{post.id}</Table.Cell>
        <Table.Cell className="tablecell">{post.title}</Table.Cell>
        <Table.Cell className="tablecell">{post.body}</Table.Cell>
        <Table.Cell verticalAlign="" className="actioncell">
          {/* <Link
            to={{
              pathname: `${post.id}`,
              // state: post,
            }}
            replace state={post}
          >
            {" "}
            <Button
              size="mini"
              icon
              color="yellow"
              onClick={() =>console.log(post)}
            >
              <Icon name="edit"></Icon>
            </Button>
          </Link> */}
          <Button
            size="mini"
            icon
            color="yellow"
            onClick={() => goToEdit(post)}
          >
            <Icon name="edit"></Icon>
          </Button>

          <UserModal
            content={
              <div>
                <p>{post.id}</p>
                <p>{post.title}</p>
                <p>{post.body}</p>
              </div>
            }
            post={post}
            isOpen={open}
            toggleOpen={toggleOpen}
            handleDelete={() => handleDelete(url, post.id)}
            resource="post"
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
      <h1>Posts</h1>
      <Table celled>
        <Table.Header>
          <Table.Row className="tableheader">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell className="tableheader">Title</Table.HeaderCell>
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
      </Table>
      <Button color="green" icon onClick={goToCreate}>
        <Icon name="add" />
      </Button>
    </div>
  );
}
