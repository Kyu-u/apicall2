import React, { useState, useEffect, ReactElement } from "react";
import UserModal from "../components/Modal";
import { makeRequest } from "../services";
import { useNavigate,  useParams, useLocation } from "react-router-dom";
import { Icon, Table, Button } from "semantic-ui-react";
import { postUrl } from "../constants";
import { IPostContent, IPostData, IUserData } from "../interfaces";
export default function Posts() {
  const location = useLocation();
  const { name } = location.state as IUserData;
  // const { name } = location.state;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  // console.log(location);
  // console.log(id);
  const [open, setOpen] = useState<boolean>(false);
  const [block, setBlock] = useState<boolean>(false);
  const [postList, setPostList] = useState<IPostData[]>([]);
  const [content, setContent] = useState<IPostContent>({
    id: 0,
    title: "",
    body: "",
  });
  // const postUrl = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

  async function fetchData() {
    try {
      setBlock(true);
      const temp = await makeRequest<IPostData[]>(`${postUrl}?userId=${id}`, "get");
      setPostList(temp);
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
  function navigateToPage(path: string, post?: IPostData) {
    if (post) navigate(path, { state: post });
    else navigate(path);
  }
  const handleDelete = async (id: number) => {
    try {
      setBlock(true);

      const response = await makeRequest<IPostData>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        "DELETE"
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
  function generateContent():ReactElement {
    return (
      <div>
        <p>{content.id}</p>
        <p>{content.title}</p>
        <p>{content.body}</p>
      </div>
    );
  }
  // function handleModalButton(content) {
  //   setContent(content);
  //   toggleOpen();
  // }
  const tableRows = postList.map((post: IPostData, i: number) => {
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
              // const temp = (
              //   <div>
              //     <p>{post.id}</p>
              //     <p>{post.title}</p>
              //     <p>{post.body}</p>
              //   </div>
              // );

              setContent({
                ...content,
                id: post.id,
                title: post.title,
                body: post.body,
              });
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
    <div className="container">
      <UserModal
        title={"Delete Post"}
        content={generateContent()}
        isOpen={open}
        toggleOpen={toggleOpen}
        handleDelete={() => handleDelete(content.id)}
        // resource="post"
      />
      <h1>{name} - Posts</h1>
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
      <Button color="green" icon onClick={() => navigateToPage("create")}>
        <Icon name="add" />
      </Button>
    </div>
  );
}