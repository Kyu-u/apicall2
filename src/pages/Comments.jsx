import React, { useState, useEffect } from "react";
import { getData } from "../services/index";
import UserModal from "../components/Modal";
import { deleteData } from "../services/index";
import { useNavigate, Link } from "react-router-dom";
import Paginator from "../components/Pagination";
import { commentUrl } from "../constants";
import { Icon, Table, Button, Menu, Segment, Sidebar } from "semantic-ui-react";
export default function Comments() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [block, setBlock] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [commentAmount, setCommentAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState({});

  // const commentUrl = `https://jsonplaceholder.typicode.com/comments`;
  async function fetchData() {
    try {
      setBlock(true);
      const temp = await getData(commentUrl);
      setCommentAmount(temp.data.length);
      const temp2 = await getData(`${commentUrl}?_page=${currentPage}`);
      setCommentList(temp2.data);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  async function loadPage(page) {
    try {
      setBlock(true);
      const temp = await getData(`${commentUrl}?_page=${page}`);
      setCommentList(temp.data);
      setBlock(false);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
    // loadPage();
  }, []);

  function goToCreate() {
    navigate("create");
  }

  function goToEdit(comment) {
    navigate(`${comment.id}`, { state: comment });
  }
  const handleDelete = async (id) => {
    const response = await deleteData(`${commentUrl}/${id}`);
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
        <Table.Cell className="actioncell">
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
          <Button
            icon
            size="mini"
            onClick={() => {
              const temp = (
                <div>
                  <p>{comment.id}</p>
                  <p>{comment.name}</p>
                  <p>{comment.body}</p>
                </div>
              );

              setContent({ ...temp, id: comment.id });
              // handleModalButton(temp);
              toggleOpen();
            }}
          >
            {" "}
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
        <Menu.Item as="a">
          <Icon name="comment" />
          Comments
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          {" "}
          <div className="container">
            <UserModal
              title={"Delete Comment"}
              content={content}
              isOpen={open}
              toggleOpen={toggleOpen}
              handleDelete={() => handleDelete(content.id)}
              resource="post"
            />
            <h1>Comments</h1>
            <Table celled>
              <Table.Header>
                <Table.Row className="tableheader">
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Post ID</Table.HeaderCell>

                  <Table.HeaderCell className="tableheader">
                    Name
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

            <Paginator
              commentAmount={commentAmount}
              loadPage={loadPage}
              activePage={currentPage}
            ></Paginator>
            <Button color="green" icon onClick={goToCreate}>
              <Icon name="add" />
            </Button>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
