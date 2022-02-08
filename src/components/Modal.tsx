import React  from "react";
import {

  Button,
  Modal,
  Header,
} from "semantic-ui-react";
import { IModalProps } from "../interfaces";
export default function UserModal(props: IModalProps) {
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
          <Button color="black" onClick={toggleOpen}>
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
