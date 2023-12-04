// DeleteModal component
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

function DeleteModal({ modalState, toggleModal, handleDelete, ...props }) {
  const { className, deleteId } = props; // new prop: deleteId
  const [backdrop, setBackdrop] = useState(true);

  const changeBackdrop = (e) => {
    let { value } = e.target;
    if (value !== "static") {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  useEffect(() => {
    // Reset the backdrop state whenever the modal is opened
    setBackdrop(true);
  }, [modalState]);

  return (
    <div>
      <Modal isOpen={modalState} toggle={toggleModal} backdrop={backdrop}>
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalFooter>
          <Button color='primary' onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
          <Button color='secondary' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

DeleteModal.propTypes = {
  className: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  deleteId: PropTypes.number.isRequired,
};

export default DeleteModal;
