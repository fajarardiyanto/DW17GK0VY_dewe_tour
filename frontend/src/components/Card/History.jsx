import React from "react";
import "./css/booking.css";

import IconBlack from "../../Images/Icon-black.png";
import Bukti from "../../Images/2204979_20170708045545 1.png";

import { useQuery } from "react-query";
import { Card, Table } from "react-bootstrap";
import { formatNumber } from "../Utils/formatNumber";
import { useLocation, useParams } from "react-router-dom";

function History() {
  const location = useLocation();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.token;

  const fetchGetTransaction = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/transactions/${id}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }
    );

    return response.json();
  };

  const { isLoading, data } = useQuery("transaction", fetchGetTransaction);

  return (
    <div>
      {isLoading || !data ? (
        <h1>Loading</h1>
      ) : (
        <>
          {data.data.transaction
            .filter((stat) => stat.status === "Approve")
            .map((transaction) => (
              <div key={data.data.id}>
                <>
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
                      <p className="p-booking-info">26 August 2020</p>
                    </div>
                    <div className="div-booking-info-2">
                      <h5 className="text-booking-info-2 text-booking-style">
                        Duration
                      </h5>
                      <p className="p-booking-info">6 Day 4 Night</p>
                    </div>
                    <div className="div-booking-info-3">
                      <h5 className="text-booking-info-3 text-booking-style">
                        Accomodations
                      </h5>
                      <p className="p-booking-info">Hotel 4 Nights</p>
                    </div>
                    <div className="div-booking-info-4">
                      <h5 className="text-booking-info-4 text-booking-style">
                        Transportion
                      </h5>
                      <p className="p-booking-info">Qatar Airways</p>
                    </div>
                    <Card.Body>
                      <h1 className="h1-card-1">{transaction.trip.title}</h1>
                      <p className="p-card-1" style={{ marginTop: "25px" }}>
                        Australia
                      </p>
                      <span className="span-wait-3">
                        <p>{transaction.status}</p>
                      </span>
                    </Card.Body>
                    <div className="div-table-booking">
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
                            <td>{userData.fullName}</td>
                            <td>Male</td>
                            <td>{userData.phone}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <div>
                        <h5 className="text-qty">
                          Qty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                          &nbsp;&nbsp;&nbsp; {transaction.counterQty}
                        </h5>
                        <h5 className="text-price">
                          Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                          &nbsp;&nbsp;&nbsp;
                          <span>{formatNumber.format(transaction.total)}</span>
                        </h5>
                      </div>
                    </div>
                    <span className="hr-book"></span>
                    <span className="hr-book-1"></span>
                  </Card>
                </>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default History;
