//react import
import React, { Fragment, useEffect, useState } from "react";

//react-hot-toast import
import toast, { Toaster } from "react-hot-toast";

import Input from "./Input";
import { editPokeData } from "@/services/pokemon.service";

const DetailsCard = ({ id, pokeData }: { id: any; pokeData: any }) => {
  //editForm Values
  const [baseExperience, setBaseExperience] = useState(pokeData.baseExperience);
  const [height, setHeight] = useState(pokeData.height);
  const [weight, setWeight] = useState(pokeData.weight);
  //editing state
  const [isEditing, setIsEditing] = useState(false);
  // payload
  const payload = {
    baseExperience,
    height,
    weight,
  };

  console.log(pokeData);
  // console.log(payload);

  const handleEditClick = () => {
    console.log("Edit Clicked");
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    console.log("DEl Clicked");
    toast.success("Pokemon Deleted");
  };

  const handleSaveClick = () => {
    console.log("Save clicked");
    editPokeData(id, payload);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    console.log("Cancel Clicked");
    setIsEditing(false);
  };

  // useEffect(() => {}, [isEditing]);

  return (
    <Fragment>
      <div className="flex items-center justify-center py-40">
        <div className="w-80 bg-yellow-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
          <img
            src="https://cdn.icon-icons.com/icons2/851/PNG/512/Ultra_Ball_icon-icons.com_67500.png"
            alt="Pokemon"
            className="w-54 h-54 mx-auto mb-6"
          />
          <h5 className="text-4xl font-bold text-center tracking-tight text-gray-900 dark:text-white mb-6">
            {`${pokeData.name}`}
          </h5>
          {!isEditing ? (
            <div>
              <p className="text-lg font-bold  text-gray-700 dark:text-gray-400 mb-3">
                {`Base Experience: `}

                <span className="font-normal  text-yellow-700">
                  {baseExperience}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-700 dark:text-gray-400 mb-3">
                {`Height: `}
                <span className="font-normal  text-yellow-700">{height}</span>
              </p>
              <p className="text-lg font-bold  text-gray-700 dark:text-gray-400 mb-3">
                {`Weight: `}
                <span className="font-normal text-yellow-700">{weight}</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Input
                id="baseExperience"
                type="text"
                label="baseExperience"
                value={baseExperience}
                onChange={(e: any) => setBaseExperience(e.target.value)}
              />
              <Input
                id="Height"
                type="number"
                label="Height"
                value={height}
                onChange={(e: any) => setHeight(e.target.value)}
              />
              <Input
                id="Weight"
                type="number"
                label="Weight"
                value={weight}
                onChange={(e: any) => setWeight(e.target.value)}
              />
            </div>
          )}

          {/* button part */}
          {!isEditing ? (
            <div className="flex justify-center mt-6 gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-6 gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          )}
          {/* button part */}
        </div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </Fragment>
  );
};

export default DetailsCard;

{
  /* <Card
  className="max-w-sm  bg-yellow-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  imgSrc="https://cdn.icon-icons.com/icons2/851/PNG/512/Ultra_Ball_icon-icons.com_67500.png"
  horizontal
>
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {`${props.name}`}
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400">
    {`Base Experience: ${props.baseExperience}`}
  </p>
  <p className="font-normal text-gray-700 dark:text-gray-400">
    {`Height: ${props.height}`}
  </p>
  <p className="font-normal text-gray-700 dark:text-gray-400">
    {`Weight: ${props.weight}`}
  </p>
  <div className="flex justify-between mt-4">
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Edit
    </button>
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
      Delete
    </button>
  </div>  
</Card> */
}
