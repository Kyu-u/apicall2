import React, { useState, useEffect } from "react";
import { getData } from "../services/index";
import UserModal from "../components/Modal";
import { deleteData } from "../services/index";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { Icon, Table, Button, Menu, Segment, Sidebar } from "semantic-ui-react";
import { postUrl } from "../constants";
export default function Posts() {
  const location = useLocation();
  const { name } = location.state;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  // console.log(location);
  // console.log(id);
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [postList, setPostList] = useState([]);
  const [content, setContent] = useState({});
  // const postUrl = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

  async function fetchData() {
    try {
      setBlock(true);
      const temp = await getData(`${postUrl}?userId=${id}`);
      setPostList(temp.data);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  // function goToCreate() {
  //   navigate("create", { state: location.state });
  // }

  // function goToEdit(post) {
  //   navigate(`${post.id}`, { state: post });
  // }
  function navigateToPage(path, post) {
    if (post) navigate(path, { state: post });
    else navigate(path);
  }
  const handleDelete = async (id) => {
    try {
      setBlock(true);

      const response = await deleteData(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
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
  // function handleModalButton(content) {
  //   setContent(content);
  //   toggleOpen();
  // }
  const tableRows = postList.map((post, i) => {
    // const {  } = post;
    return (
      <Table.Row className="" key={`post${i}`}>
        <Table.Cell className="tablecell">{post.id}</Table.Cell>
        <Table.Cell className="tablecell">{post.title}</Table.Cell>
        <Table.Cell className="tablecell">{post.body}</Table.Cell>
        <Table.Cell className="actioncell">
          <Button
            size="mini"
            icon
            color="yellow"
            onClick={() => navigateToPage(`${post.id}`, post)}
          >
            <Icon name="edit"></Icon>
          </Button>
          <Button
            icon
            size="mini"
            onClick={() => {
              const temp = (
                <div>
                  <p>{post.id}</p>
                  <p>{post.title}</p>
                  <p>{post.body}</p>
                </div>
              );

              setContent({ ...temp, id: post.id });
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
        <Menu.Item onClick={() => navigate('/users', {replace: true})} as="a">
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
          {" "}
          <div className="container">
            <UserModal
              title={"Delete Post"}
              content={content}
              isOpen={open}
              toggleOpen={toggleOpen}
              handleDelete={() => handleDelete(content.id)}
              resource="post"
            />
            <h1>{name} - Posts</h1>
            <Table celled>
              <Table.Header>
                <Table.Row className="tableheader">
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell className="tableheader">
                    Title
                  </Table.HeaderCell>
                  <Table.HeaderCell className="tableheader">
                    Body
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
            <Button color="green" icon onClick={() => navigateToPage("create")}>
              <Icon name="add" />
            </Button>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
