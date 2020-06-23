import React from "react";
import PointsTable from "../views/PointsTable";

const Ranking = () => {
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <h1>Ranking</h1>
      <PointsTable />
    </div>
  );
};

export default Ranking;
