import React, { useEffect } from "react";
import "./css/detail.css";

import Footer from "../../components/Footer/footer";
import HeaderPage from "../../components/Header/HeaderPage";
import Information from "../../components/Details/information";

function Detail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeaderPage />

      <Information />

      <Footer />
    </div>
  );
}

export default Detail;
