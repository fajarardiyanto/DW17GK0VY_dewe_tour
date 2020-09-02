import React, { useState, useEffect } from "react";

import "./css/dropdown.css";
import User from "../../Images/user.png";
import Pay from "../../Images/bill 1.png";
import LogoutIcon from "../../Images/logout.png";

import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function DropdownProfil() {
  const id = localStorage.id;
  let history = useHistory();

  const [userResult, setUserResult] = useState([]);

  useEffect(() => {
    async function getUser() {
      const res = await axios(`http://localhost:8080/api/v1/user/${id}`);

      setUserResult(res.data.usersById);
    }
    getUser();
  }, []);

  const openProfile = () => {
    history.push(`/profile/${id}`);
  };

  const openPayment = () => {
    history.push(`/booking`);
  };

  const logoutAccount = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("status");
    history.push(`/`);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="flat"
          id="dropdown-menu-align-right"
          className="pps"
        ></Dropdown.Toggle>
        <Dropdown.Menu className="menu-dropdown">
          <span className="segitiga"></span>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openProfile()}
              className="text-profile btn-dropdown"
            >
              <img src={User} className="dropdown-icon" alt="icon-user" />
              Profile
            </Dropdown.Item>
          </div>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openPayment()}
              className="text-profile"
            >
              <img src={Pay} className="dropdown-icon" alt="icon-pay" />
              Pay
            </Dropdown.Item>
          </div>
          <hr className="hr-dropdown" />
          <div className="div-logout-dropdown div-item">
            <Dropdown.Item
              onClick={() => logoutAccount()}
              className="text-profile"
            >
              <img src={LogoutIcon} className="dropdown-icon" alt="icon-pay" />
              Logout
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownProfil;
