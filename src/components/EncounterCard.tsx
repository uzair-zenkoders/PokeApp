import React, { useState } from "react";

const EncounterCard = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  interface IStyle {
    width: string;
    margin: string;
    textAlign: string;
  }

  const cardStyle: IStyle = {
    width: "auto",
    margin: "100px auto",
    textAlign: "center",
  };

  const renderTabs = () => {
    return data.map((encounter, index) => (
      <li className="nav-item" key={index + 1}>
        <a
          className={`nav-link ${activeTab === index + 1 ? "active" : ""}`}
          href="#"
          onClick={() => handleTabClick(index + 1)}
        >
          Encounter {index + 1} Details
        </a>
      </li>
    ));
  };

  const renderEncounterContent = () => {
    return data.map((encounter, index) => (
      <div
        key={index}
        style={{ display: activeTab === index + 1 ? "block" : "none" }}
      >
        <h5 className="card-title">Encounter {index + 1} Location</h5>
        <p className="card-text">{encounter.location_area.name}</p>
      </div>
    ));
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <div className="card text-center" style={cardStyle}>
          <div className="card-body">
            <p>No encounters</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card text-center" style={cardStyle}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">{renderTabs()}</ul>
        </div>
        <div className="card-body">{renderEncounterContent()}</div>
      </div>
    </div>
  );
};

export default EncounterCard;
