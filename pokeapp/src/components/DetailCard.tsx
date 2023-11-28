import { useRouter } from "next/router";
import React from "react";

const DetailsCard = (props) => {
  const router = useRouter();
  const onClick = () => {
    console.log(props.encounter);
    router.push(`/pokemon/${props.id}/encounter`);
  };

  const cardStyle = {
    width: "18rem",
    margin: "100px auto",
    textAlign: "center",
  };

  return (
    <div className="card" style={cardStyle}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Pokemon Id : {props.id}</li>
        <li className="list-group-item">
          Base Experience : {props.baseExperience}
        </li>
        <li className="list-group-item">Height: {props.height}</li>
        <li className="list-group-item">Weight: {props.weight}</li>
        <li className="list-group-item">Moves: {props.moves}</li>
        <li className="list-group-item">Order: {props.order}</li>
        {/* <li className="list-group-item">Encounters: {props.encounter}</li> */}
        <li>
          <button
            type="button"
            className="btn btn-primary my-3 "
            onClick={onClick}
          >
            View Pokemon encounters
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DetailsCard;
