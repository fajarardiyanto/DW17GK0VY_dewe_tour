import React from "react";

import "./css/groupTour.css";

import GroupTourList from "../Home/groupTourList";

function GroupTour(props) {
  const DATAS = [
    {
      id: 1,
      img: require("../../Images/img6.png"),
      title: "6D/4N Fun Tassie Vacation ...",
      price: "12.398.000",
      country: "Australia",
    },
    {
      id: 2,
      img: require("../../Images/img1.png"),
      title: "6D/4N Exciting Summer in ...",
      price: "10.288.000",
      country: "South Korea",
    },
    {
      id: 3,
      img: require("../../Images/img2.png"),
      title: "8D/6N Wonderful Auntum ...",
      price: "28.999.000",
      country: "Japan",
    },
    {
      id: 4,
      img: require("../../Images/img3.png"),
      title: "4D/3N Overland Jakarta B ...",
      price: "3.188.000",
      country: "Indonesia",
    },
    {
      id: 5,
      img: require("../../Images/img4.png"),
      title: "4D/3N Labuan Bajo Delight",
      price: "10.488.000",
      country: "Indonesia",
    },
    {
      id: 6,
      img: require("../../Images/img5.png"),
      title: "5D/4N Magic Tokyo Fun",
      price: "11.188.000",
      country: "Japan",
    },
  ];

  // return <GroupTourList datas={fetchTrip} titles={props.titles} />;
  return DATAS;
}

export default GroupTour;
