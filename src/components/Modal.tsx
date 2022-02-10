import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Header } from "semantic-ui-react";
import { IModalProps } from "../interfaces";
import { closeUserModal } from "../redux/actions";
import { RootType } from "../redux/reducers/RootReducer";
export default function UserModal(props: IModalProps) {
  const dispatch = useDispatch();
  const { isOpen, handleDelete, content, title, toggleOpen } = props;
  // console.log(`content`,content);
  const url = "https://jsonplaceholder.typicode.com/";

  function handleYes() {
    handleDelete();
    toggleOpen();
  }

  const onClose = () => {
    dispatch(closeUserModal)
  }
  const open  = useSelector((state: RootType)=> state.userModal.isOpen)

  return (
    <div>
      <Modal open={open}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{content}</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={onClose}>
            Nope
          </Button>
          <Button
            color="red"
            content="Yes"
            labelPosition="right"
            icon="checkmark"
            onClick={handleYes}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}
