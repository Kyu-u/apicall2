import React, {useState} from "react";
import {
  Icon,
  Label,
  Menu,
  Table,
  Button,
  Modal,
  Header,
  Image,
} from "semantic-ui-react";
import { deleteData } from "./services";
export default function UserModal(props) {
  const [open, setOpen] = React.useState(false);
  const { name, email, id } = props.user;
  const url = "https://jsonplaceholder.typicode.com/users/";
  const handleDelete = async () => {
    const response = await deleteData(`${url}${id}`);    
    console.log(response);
  }
  // console.log(props);
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size="mini"><Icon name="delete"></Icon></Button>}
      >
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="/images/avatar/large/rachel.png" wrapped />
          <Modal.Description>
            <Header>Are you sure you want to delete this user?</Header>
            <p>ID: { id}</p>
            <p>
              Name : {name}
            </p>
            <p>Email : { email}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            color="red"
            content="Yes"
            labelPosition="right"
            icon="checkmark"
            onClick={async () => {
              handleDelete();
              setOpen(false);
            }}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}
