import React, { useState } from "react";
import "./css/Information.css";
import "./css/imgs.css";

import plus from "../../Images/Plus.png";
import time from "../../Images/time.png";
import meal from "../../Images/meal.png";
import plane from "../../Images/plane.png";
import hotel from "../../Images/hotel.png";
import minus from "../../Images/Minus.png";
import kalender from "../../Images/kalender.png";

import { useQuery } from "react-query";
import ModalError from "../Modal/modalError";
import { Link, useParams } from "react-router-dom";
import { formatNumber } from "../Utils/formatNumber";
import { Image, Container, Table, Col, Row } from "react-bootstrap";

const Information = () => {
  const Imgs = [
    {
      id: 2,
      img: require("../../Images/3.png"),
    },
    {
      id: 1,
      img: require("../../Images/1.png"),
    },
    {
      id: 3,
      img: require("../../Images/2.png"),
    },
    {
      id: 4,
      img: require("../../Images/4.png"),
    },
  ];

  const first = Imgs[0];
  const param = useParams();
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({
    counter: 1,
    total: 0,
    status: "Waiting",
  });

  const addCounter = () => {
    setOrder({ ...order, counter: order.counter + 1 });
  };

  const minCounter = () => {
    if (order.counter === 1) setOrder({ ...order, counter: order.counter });
    else {
      setOrder({ ...order, counter: order.counter - 1 });
    }
  };

  const fetchGetTrip = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/trip/${param.id}`
    );

    return response.json();
  };

  const { isLoading, data } = useQuery("trip", fetchGetTrip);
  const trip = data;

  const setLoginHandle = () => {
    if (localStorage.getItem("token") === null) {
      setShow(true);
    }
  };

  const exitClick = () => {
    setShow(false);
  };

  return (
    <div className="imgs">
      <Container>
        <Row>
          <Col>
            {Imgs.map((img) => {
              if (img.id === first.id) {
                return (
                  <div key={img.id}>
                    <Image
                      className="img"
                      src={img.img}
                      alt="Image"
                      rounded
                      style={{ width: "1018px", height: "362px" }}
                    />
                  </div>
                );
              }
              return (
                <Image
                  className="img"
                  src={img.img}
                  alt="Image"
                  rounded
                  style={{ width: "330px", height: "169px" }}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
      <h5 className="textMuted-1">Information Trip</h5>
      <Container>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div key={trip.data.id}>
              <h2 className="title-trip">{trip.data.title}</h2>
              <h5 className="textMuted-country">{trip.data.country.name}</h5>
              <Table responsive="sm" className="col--1 table-borderless">
                <thead>
                  <tr>
                    <th className="textMuted-2">Accommodation</th>
                    <th className="textMuted-2">Transportation</th>
                    <th className="textMuted-2">Eat</th>
                    <th className="textMuted-2">Duration</th>
                    <th className="textMuted-2">Date Trip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tr-1">
                    <td className="td-1">
                      <Image src={hotel}></Image>&nbsp; {trip.data.accomodation}
                    </td>
                    <td>
                      <Image src={plane}></Image>&nbsp;{" "}
                      {trip.data.transportation}
                    </td>
                    <td>
                      <Image src={meal}></Image>&nbsp; {trip.data.eat}
                    </td>

                    <td>
                      <Image src={time}></Image>&nbsp; {trip.data.day} Day{" "}
                      {trip.data.night} Night
                    </td>

                    <td>
                      <Image src={kalender}></Image>&nbsp; {trip.data.dateTrip}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <h5 className="textMuted-3">Description</h5>
                <p className="lorem">{trip.data.description}</p>
              </div>
              <div>
                <h3 className="textMuted-4">
                  {formatNumber.format(trip.data.price)}
                  <span> / Person</span>
                </h3>
                <div>
                  <Row className="row-1">
                    <Col>
                      <button className="btn-min" onClick={minCounter}>
                        <Image src={minus}></Image>
                      </button>
                    </Col>
                    <Col>
                      <h5>{order.counter}</h5>
                    </Col>
                    <Col>
                      <button className="btn-min" onClick={addCounter}>
                        <Image src={plus}></Image>
                      </button>
                    </Col>
                  </Row>
                </div>
                <hr className="hr-1" />
                <div>
                  <h5 className="textMuted-5">Total : </h5>
                  <h5 className="textMuted-6">
                    {formatNumber.format(trip.data.price * order.counter)}
                  </h5>
                </div>
                <hr className="hr-2" />
                <button className="btn5" onClick={setLoginHandle}>
                  {localStorage.getItem("token") === null ? (
                    <p>Book Now</p>
                  ) : (
                    <Link
                      to={{
                        pathname: `/booking/${trip.data.id}/qty=${order.counter}`,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <p>Book Now</p>
                    </Link>
                  )}
                </button>
                <ModalError
                  show={show}
                  onHide={exitClick}
                  message={<p>Silahkan login terlebih dahulu</p>}
                />
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Information;
