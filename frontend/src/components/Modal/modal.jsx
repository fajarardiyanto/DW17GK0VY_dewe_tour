import React from "react";
import { Modal } from "react-bootstrap";

import "./css/modal.css";
import palm from "../../Images/palmL.png";
import hibiscus from "../../Images/hibiscusL.png";

const Modals = (props) => {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        scrollable={true}
        className="set-modal"
        animation={true}
      >
        <img className="hibiscuss" src={hibiscus} alt="bunga" />
        <img className="palms" src={palm} alt="bunga" />
        <Modal.Header
          className={`headers ${props.headerCss}`}
          style={{ marginBottom: "-30px" }}
        >
          {props.header}
        </Modal.Header>
        {props.error && (
          <div className="my-3 alert alert-danger text-center">
            {props.error}
          </div>
        )}
        <Modal.Body className="bodi">{props.form}</Modal.Body>
        <Modal.Footer className="footers">{props.footer}</Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
