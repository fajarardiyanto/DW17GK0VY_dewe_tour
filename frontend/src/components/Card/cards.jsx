import React from "react";

import "./css/cards.css";
import Icon from "../../Images/Icon-black.png";
import Bukti from "../../Images/2204979_20170708045545 1.png";

import axios from "axios";
import { useQuery } from "react-query";
import { formatNumber } from "../Utils/formatNumber";
import { Modal, Card, Table, Button } from "react-bootstrap";

const Cards = (props) => {
  const token = localStorage.token;
  const transactionId = localStorage.transaction;

  const updateTransaction = async (counterQty, total, tripId) => {
    try {
      const forms = {
        counterQty: counterQty,
        total: total,
        status: "Approve",
        tripId: tripId,
      };
      await axios.patch(
        `http://localhost:8080/api/v1/transaction/${transactionId}`,
        forms,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      props.setShowRegister(false);
    } catch (err) {}
  };

  const updateTransactionCancel = async (counterQty, total, tripId) => {
    try {
      const forms = {
        counterQty: counterQty,
        total: total,
        status: "Cancel",
        tripId: tripId,
      };
      await axios.patch(
        `http://localhost:8080/api/v1/transaction/${transactionId}`,
        forms,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      props.setShowRegister(false);
    } catch (err) {}
  };

  const getDetailTransaction = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err) {}
  };

  const { isLoading, data: dataTrans } = useQuery(
    "transaction",
    getDetailTransaction
  );

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        dialogClassName="modal-90w"
        size={"xl"}
      >
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <>
            {dataTrans.data.data.map((trans) => (
              <div>
                {trans.id == transactionId && (
                  <div>
                    <Card>
                      <Card.Img src={Icon} className="icon-card-booking-1" />
                      <div className="div-text-booking-1">
                        <h1 className="booking-text-1">Booking</h1>
                        <p className="text-day-1">
                          <b>Saturday</b>, 22 Juny 2020
                        </p>
                        <Card.Img src={Bukti} className="img-payment-1" />
                        <p className="text-upload-1">upload payment proof</p>
                      </div>
                      <div className="div-booking-info-11">
                        <h5 className="text-booking-info-1 text-booking-style">
                          Date Trip
                        </h5>
                        <p className="p-booking-info">{trans.trip.dateTrip}</p>
                      </div>
                      <div className="div-booking-info-22">
                        <h5 className="text-booking-info-2 text-booking-style">
                          Duration
                        </h5>
                        <p className="p-booking-info">
                          {trans.trip.day} Day {trans.trip.night} Night
                        </p>
                      </div>
                      <div className="div-booking-info-33">
                        <h5 className="text-booking-info-3 text-booking-style">
                          Accomodations
                        </h5>
                        <p className="p-booking-info">
                          {trans.trip.accomodation}
                        </p>
                      </div>
                      <div className="div-booking-info-44">
                        <h5 className="text-booking-info-4 text-booking-style">
                          Transportion
                        </h5>
                        <p className="p-booking-info">
                          {trans.trip.transportation}
                        </p>
                      </div>
                      <Card.Body>
                        <h1 className="h1-card-2">{trans.trip.title}</h1>
                        <p
                          className="p-card-1"
                          style={{ marginTop: "25px", width: "150px" }}
                        >
                          {trans.trip.country.name}
                        </p>

                        <span className={`span-wait-${"Approve" ? "3" : "1"}`}>
                          <p style={{ marginLeft: "9px" }}>{trans.status}</p>
                        </span>
                      </Card.Body>
                      <div className="div-table-booking-1">
                        <Table
                          responsive="sm"
                          className="col--2 table-borderlesss"
                        >
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
                              <td>{trans.user.fullName}</td>
                              <td>Male</td>
                              <td>{trans.user.phone}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <h5 className="text-qty">
                          Qty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                          &nbsp;&nbsp;&nbsp; {trans.counterQty}
                        </h5>
                        <h5 className="text-price">
                          Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                          &nbsp;&nbsp;&nbsp;
                          <span>{formatNumber.format(trans.total)}</span>
                        </h5>
                      </div>
                      <span className="hr-book"></span>
                      <span className="hr-book-1"></span>
                      <div className="btn-modal">
                        <Button
                          variant="flat"
                          className="btn-approve btn-cancel"
                          onClick={updateTransaction.bind(
                            this,
                            trans.counterQty,
                            trans.total,
                            trans.trip.id
                          )}
                        >
                          <p>Approve</p>
                        </Button>
                        <Button
                          variant="flat"
                          className="btn-cancel"
                          // onClick={props.buttonOnHide}
                          onClick={updateTransactionCancel.bind(
                            this,
                            trans.counterQty,
                            trans.total,
                            trans.trip.id
                          )}
                        >
                          <p>Cancel</p>
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
};

export default Cards;
