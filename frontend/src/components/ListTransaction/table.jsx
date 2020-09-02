import React, { useState } from "react";
import "./css/table.css";

import axios from "axios";
import Cards from "../Card/cards";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import IconSearch from "../../Images/search.png";
import { Table, Container } from "react-bootstrap";

const Tables = () => {
  let history = useHistory();
  const token = localStorage.token;
  const [showModalAction, setShowModalAction] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (err) {}
  };

  const { isLoading, data: getTransaction } = useQuery(
    "transactions",
    fetchTransactions
  );

  const onClickAction = (id) => {
    localStorage.setItem("transaction", id);
    setShowModalAction(true);
  };

  const exitClickAction = () => {
    setShowModalAction(false);
    history.push(`/admin/list-transaction`);
  };

  return (
    <Container>
      <Table striped responsive="xl" variant="light" className="table-list">
        <thead>
          <tr>
            <th>No</th>
            <th>Users</th>
            <th>Trip</th>
            <th>Bukti Transfer</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || !getTransaction ? (
            <h1>Loading..</h1>
          ) : (
            <>
              {getTransaction.data.data.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td className="status-style">{index + 1}</td>
                  <td className="status-style">{transaction.user.fullName}</td>
                  <td className="status-style">{transaction.trip.title}</td>
                  <td className="status-style">{transaction.attachment}</td>
                  <td
                    className="color-status status-style"
                    style={
                      transaction.status === "Pending"
                        ? { color: "#f7941e" }
                        : transaction.status === "Approve"
                        ? { color: "#0ACF83" }
                        : { color: "#FF0742" }
                    }
                  >
                    {transaction.status}
                  </td>
                  <td>
                    <button variant="flat" className="btn-iconsearch">
                      <img
                        src={IconSearch}
                        alt="search"
                        onClick={onClickAction.bind(this, transaction.id)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
              <Cards
                show={showModalAction}
                onHide={exitClickAction}
                buttonOnHide={exitClickAction}
                setShowRegister={exitClickAction}
              />
            </>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tables;
