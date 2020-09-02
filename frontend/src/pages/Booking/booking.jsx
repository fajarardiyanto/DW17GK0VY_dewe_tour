import React from "react";
import "./css/booking.css";

import Footer from "../../components/Footer/footer";
import HeaderPage from "../../components/Header/HeaderPage";
import BookingCard from "../../components/Card/BookingCard";

function Booking() {
  return (
    <div>
      <HeaderPage />
      <BookingCard />
      <Footer />
    </div>
  );
}

export default Booking;
