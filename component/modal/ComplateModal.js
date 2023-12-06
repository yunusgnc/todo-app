// DeleteModal component
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

function ComplateModal({
  modalState,
  toggleModal,
  handleComplete,
  deleteId: todoId,
  ...props
}) {
  const [backdrop, setBackdrop] = useState(true);

  useEffect(() => {
    setBackdrop(true);
  }, [modalState]);

  return (
    <div>
      <Modal isOpen={modalState} toggle={toggleModal} backdrop={backdrop}>
        <ModalHeader toggle={toggleModal}>Complate Todo</ModalHeader>
        <ModalFooter>
          <Button color='primary' onClick={() => handleComplete(todoId)}>
            Complate
          </Button>
          <Button color='secondary' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

ComplateModal.propTypes = {
  className: PropTypes.string,
  handleComplete: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired,
};

export default ComplateModal;
