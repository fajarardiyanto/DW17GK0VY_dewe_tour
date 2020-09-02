import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./css/header.css";

const GroupList = (props) => {
  return (
    <div>
      <Card>
        <span className="spann">12/15</span>
        <Link to={{ pathname: `/detail/${props.paramId}` }}>
          <img className="centers" src={props.img} alt="img" />
        </Link>
        <Card.Body>
          <Card.Title className="titles">
            {`${props.title.substring(0, 24)} .....`}
          </Card.Title>
          <Card.Text className="texts">IDR. {props.price}</Card.Text>
          <Card.Text className="negara">{props.country}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GroupList;
