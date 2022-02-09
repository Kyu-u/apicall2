import React, { useState, useEffect, ReactElement } from "react";
import { makeRequest } from "../services/index";
import UserModal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import Paginator from "../components/Pagination";
import { commentUrl } from "../constants";
import { Icon, Table, Button,  } from "semantic-ui-react";
import { ICommentData } from "../interfaces";
export default function Comments() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const [block, setBlock] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<ICommentData[]>([]);
  const [commentAmount, setCommentAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [content, setContent] = useState<ICommentData>({
    id: 0,
    postId: 0,
    name: "",
    body: "",
  });

  // const commentUrl = `https://jsonplaceholder.typicode.com/comments`;
  async function fetchData() {
    try {
      setBlock(true);
      const temp = await makeRequest<ICommentData[]>(commentUrl, "GET");
      setCommentAmount(temp.length);
      const temp2 = await makeRequest<ICommentData[]>(
        `${commentUrl}?_page=${currentPage}`,
        "GET"
      );
      setCommentList(temp2);
      setBlock(false);
    } catch (error) {
      console.error(error);
    }
  }
  async function loadPage(page: number) {
    try {
      setBlock(true);
      const temp = await makeRequest<ICommentData[]>(`${commentUrl}?_page=${page}`, "GET");
      setCommentList(temp);
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
  function generateContent(): ReactElement {
    return (
      <div>
        <p>{content.id}</p>
        <p>{content.name}</p>
        <p>{content.body}</p>
      </div>
    );
  }

  function goToEdit(comment: ICommentData) {
    navigate(`${comment.id}`, { state: comment });
  }
  const handleDelete = async (id: number) => {
    const response = await makeRequest<ICommentData[]>(`${commentUrl}/${id}`, "GET");
    console.log(response);
  };
  function toggleOpen() {
    setOpen(!open);
  }
  const tableRows = commentList.map((comment: ICommentData, i: number) => {
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
              // const temp = (
              //   <div>
              //     <p>{comment.id}</p>
              //     <p>{comment.name}</p>
              //     <p>{comment.body}</p>
              //   </div>
              // );

              setContent({
                ...content,
                id: comment.id,
                name: comment.name,
                body: comment.body,
              });
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
    <div className="container">
      <UserModal
        title={"Delete Comment"}
        content={generateContent()}
        isOpen={open}
        toggleOpen={toggleOpen}
        handleDelete={() => handleDelete(content.id)}
        // resource="post"
      />
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
  );
}
