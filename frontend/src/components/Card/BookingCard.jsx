import React, { useEffect, useState } from "react";
import "./css/booking.css";

import IconBlack from "../../Images/Icon-black.png";
import Bukti from "../../Images/2204979_20170708045545 1.png";

import { useQuery, useMutation } from "react-query";
import { formatNumber } from "../Utils/formatNumber";
import { Card, Table, Button, Modal } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

function BookingCard() {
  const location = useLocation();
  const { id, qty } = useParams();
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showModalPay, setShowModalPay] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [statusPayment, setStatusPayment] = useState("Waiting Payment");

  const changeStatusTransaction = () => {
    localStorage.setItem("status", "bayar");
    setStatusPayment("Waiting Approve");
    setShowModalPay(true);
  };

  const exitClickPay = () => {
    setShowModalPay(false);
  };

  const fetchGetTrip = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/trip/${id}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    return response.json();
  };

  const { isLoading, data } = useQuery("trip", fetchGetTrip);
  const trip = data;

  const setTotalPriceQty = () => {
    return trip.data.price * qty;
  };

  const handleTransaction = async () => {
    const res = await fetch("http://localhost:8080/api/v1/transaction", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify({
        counterQty: qty,
        total: setTotalPriceQty(),
        status: statusPayment,
        attachment: "bri.jpg",
        tripId: id,
        userId,
      }),
    }).then(refetch);

    return res.json();
  };

  const [handleAddTransaction, { refetch }] = useMutation(handleTransaction);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div key={trip.data.id}>
            <Card className="card-span">
              <Card.Img src={IconBlack} className="icon-card-booking" />
              <div className="div-text-booking">
                <h1 className="booking-text">Booking</h1>
                <p className="text-day">
                  <b>Saturday</b>, 22 Juny 2020
                </p>
                <Card.Img src={Bukti} className="img-payment" />
                <p className="text-upload">
                  {location.pathname === "/profile"
                    ? "TKC0101"
                    : "upload payment proof"}
                </p>
              </div>
              <div className="div-booking-info-1">
                <h5 className="text-booking-info-1 text-booking-style">
                  Date Trip
                </h5>
                <p className="p-booking-info">{trip.data.dateTrip}</p>
              </div>
              <div className="div-booking-info-2">
                <h5 className="text-booking-info-2 text-booking-style">
                  Duration
                </h5>
                <p className="p-booking-info">
                  {trip.data.day} Day {trip.data.night} Night
                </p>
              </div>
              <div className="div-booking-info-3">
                <h5 className="text-booking-info-3 text-booking-style">
                  Accomodations
                </h5>
                <p className="p-booking-info">{trip.data.accomodation}</p>
              </div>
              <div className="div-booking-info-4">
                <h5 className="text-booking-info-4 text-booking-style">
                  Transportion
                </h5>
                <p className="p-booking-info">{trip.data.transportation}</p>
              </div>
              <Card.Body>
                <h1 className="h1-card-1">{trip.data.title}</h1>
                <p
                  className="p-card-1"
                  style={{ marginTop: "25px", width: "150px" }}
                >
                  {trip.data.country.name}
                </p>
                <span
                  className={`span-wait-${
                    location.pathname === "/profile"
                      ? "3"
                      : localStorage.status ||
                        location.pathname === "/admin/list-transaction"
                      ? "2"
                      : "1"
                  }`}
                >
                  <p>
                    {`${
                      location.pathname === "/profile"
                        ? "Approve"
                        : localStorage.status ||
                          location.pathname === "/admin/list-transaction"
                        ? "Waiting Approve"
                        : statusPayment
                    }`}
                  </p>
                </span>
              </Card.Body>
              <div className="div-table-booking">
                <Table responsive="sm" className="col--2 table-borderlesss">
                  <thead>
                    <tr>
                      <th className="textMuted-7">No</th>
                      <th className="textMuted-7">Full Name</th>
                      <th className="textMuted-7">Gender</th>
                      <th className="textMuted-7">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tr-2">
                      <td>1</td>
                      <td>{userData.fullName}</td>
                      <td>Male</td>
                      <td>{userData.phone}</td>
                    </tr>
                  </tbody>
                </Table>
                <div>
                  <h5 className="text-qty">
                    Qty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;{" "}
                    {qty}
                  </h5>
                  <h5 className="text-price">
                    Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                    &nbsp;&nbsp;&nbsp;
                    <span>{formatNumber.format(setTotalPriceQty())}</span>
                  </h5>
                </div>
              </div>
              <span className="hr-book"></span>
              <span className="hr-book-1"></span>
            </Card>
            <Card
              className={`card-btn ${
                localStorage.status ||
                location.pathname === "/profile" ||
                location.pathname === "/admin/list-transaction"
                  ? "hidden"
                  : "visible"
              }`}
            >
              <Button
                className="btn-pay"
                variant="flat"
                onClick={() => {
                  changeStatusTransaction();
                  handleAddTransaction();
                }}
              >
                <b>PAY</b>
              </Button>
            </Card>
            <ModalPay show={showModalPay} onHide={exitClickPay} />
          </div>
        </>
      )}
    </div>
  );
}

function ModalPay(props) {
  return (
    <div>
      <Modal
        className="set-modals"
        show={props.show}
        onHide={props.onHide}
        size={"lg"}
      >
        <Modal.Body className="body-modals">
          Your payment will be confirmed within 1 x 24 hours.
          <div>
            To see orders click <Link to="/profile">Here </Link>thank you
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookingCard;
