import React from "react";

import guarante from "../../Images/guarante.png";
import iconGroup from "../../Images/Group.png";
import heart from "../../Images/heart.png";
import iconVector from "../../Images/Vector.png";
import "./css/card.css";

import { CardDeck, Card, Container } from "react-bootstrap";

function Cards() {
  return (
    <div>
      <Container className="App">
        <CardDeck>
          <Card>
            <img className="center" src={guarante} alt="img" />
            <Card.Body>
              <Card.Title className="title">
                Best Price
                <br />
                Guarante
              </Card.Title>
              <Card.Text className="text">
                A small river named Duren flows by their places and supplies
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <img className="center" src={heart} alt="img" />
            <Card.Body>
              <Card.Title className="title">Travellers Love Us</Card.Title>
              <Card.Text className="text">
                A small river named Duren flows by their places and supplies
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <img className="center" src={iconVector} alt="img" />
            <Card.Body>
              <Card.Title className="title">Best Travel Agent</Card.Title>
              <Card.Text className="text">
                A small river named Duren flows by their places and supplies
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <img className="center" src={iconGroup} alt="img" />
            <Card.Body>
              <Card.Title className="title">Our Dedicated Support</Card.Title>
              <Card.Text className="text">
                A small river named Duren flows by their places and supplies
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
}

export default Cards;
