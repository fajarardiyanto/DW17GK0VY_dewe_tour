import React from "react";

import LogoutIcon from "../../Images/logout.png";
import Journey from "../../Images/journey.png";

import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function DropdownAdmin() {
  let history = useHistory();

  const openIncomingTrip = () => {
    history.push(`/incoming`);
  };

  const openTransaction = () => {
    history.push(`/admin/list-transaction`);
  };

  const logoutAccount = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("transaction");
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
          <span class="segitiga"></span>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openIncomingTrip()}
              className="text-profile btn-dropdown"
            >
              <img src={Journey} className="dropdown-icon" alt="icon-user" />
              Trip
            </Dropdown.Item>
          </div>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openTransaction()}
              className="text-profile btn-dropdown"
            >
              {/* <img src={Journey} className="dropdown-icon" alt="icon-user" /> */}
              List Transaction
            </Dropdown.Item>
          </div>
          <hr className="hr-dropdown" />
          <div className="div-logout-dropdown div-item">
            <Dropdown.Item
              className="text-profile"
              onClick={() => logoutAccount()}
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

export default DropdownAdmin;
