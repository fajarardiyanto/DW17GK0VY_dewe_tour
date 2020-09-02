import React from "react";
import "./css/modal.css";

import { Modal } from "react-bootstrap";

const ModalError = (props) => {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        scrollable={true}
        className="set-modal"
        animation={true}
      >
        <Modal.Header
          className={`headers ${props.headerCss}`}
          style={{ marginBottom: "-30px" }}
        >
          {props.header}
        </Modal.Header>
        <Modal.Body className="bodi">{props.message}</Modal.Body>
        <Modal.Footer className="footers">{props.footer}</Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalError;
