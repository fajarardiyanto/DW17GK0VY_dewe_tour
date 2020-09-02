import React, { useEffect } from "react";

import Footer from "../../components/Footer/footer";
import Tables from "../../components/ListTransaction/table";
import HeaderPage from "../../components/Header/HeaderPage";

const Transaction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = {
    color: "#000",
    fontSize: "36px",
    textAlign: "left",
    marginLeft: "125px",
    marginTop: "70px",
    marginBottom: "20px",
    fontWeight: "700",
  };
  return (
    <div>
      <HeaderPage />
      <h2 style={styles}>Incoming Transaction</h2>
      <Tables />
      <Footer />
    </div>
  );
};

export default Transaction;
