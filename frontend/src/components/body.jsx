import React from "react";

import "../App.css";

import hibiscus from "../Images/hibiscus.png";
import palm from "../Images/palm.png";
import leaf from "../Images/leaf.png";

function Bodys() {
  return (
    <div>
      <img className="hibiscus" src={hibiscus} alt="bunga" />
      <img className="palm" src={palm} alt="bunga" />
      <img className="leaf" src={leaf} alt="bunga" />
    </div>
  );
}

export default Bodys;
