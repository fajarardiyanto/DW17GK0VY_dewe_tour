import React, { useEffect } from "react";

import Icon from "../../Images/Icon.png";
import "./css/incoming.css";

import Footer from "../../components/Footer/footer";
import { Link, useHistory } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import GroupTourList from "../../components/Home/groupTourList";
import DropdownAdmin from "../../components/Dropdown/dropdownAdmin";

function Incoming() {
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openAddTrip = () => {
    history.push(`/add-trip`);
  };

  const styles = {
    color: "#000",
    fontSize: "36px",
    textAlign: "left",
    marginLeft: "98px",
    fontWeight: "700",
  };

  return (
    <div>
      <Jumbotron fluid className="jumbotrons">
        <Link to="/">
          <img className="logo" src={Icon} alt="Icon" />
        </Link>
        <DropdownAdmin />
        <Button
          variant="flat"
          className="btn-addTrip"
          size="sm"
          onClick={() => openAddTrip()}
        >
          <p>Add Trip</p>
        </Button>
      </Jumbotron>
      <h3 style={styles}>Incoming Trip</h3>
      <GroupTourList />
      <Footer />
    </div>
  );
}
export default Incoming;
