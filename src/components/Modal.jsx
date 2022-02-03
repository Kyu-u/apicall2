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
export default function UserModal(props) {
  const { isOpen, handleDelete,content, title, toggleOpen } = props;
  // console.log(`content`,content);
  const url = "https://jsonplaceholder.typicode.com/";

  function handleYes() {
    handleDelete();
    toggleOpen();
  }

  return (
    <div>
      <Modal
        onClose={() => toggleOpen()}
        onOpen={() => toggleOpen()}
        open={isOpen}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{content}</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => toggleOpen()}>
            Nope
          </Button>
          <Button
            color="red"
            content="Yes"
            labelPosition="right"
            icon="checkmark"
            onClick={
              handleYes
            }
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}
