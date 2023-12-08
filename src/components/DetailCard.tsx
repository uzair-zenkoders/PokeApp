//react import
import React, { Fragment, useState } from "react";
import { ChangeEvent } from "react";

//react-hot-toast import
import toast, { Toaster } from "react-hot-toast";

//local component import(s)
import Input from "./Input";

//local-firebase-service import
import { deletePokebyId, editPokeData } from "@/services/pokemon.service";
import { useRouter } from "next/router";

//pokeData interface
interface PokeData {
  name: string;
  weight: string;
  baseExperience: string;
  height: string;
}

//Props interface
interface DetailsCardProps {
  id: string;
  pokeData: PokeData;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ id, pokeData }) => {
  //router setup
  const router = useRouter();
  //editForm Values
  const [baseExperience, setBaseExperience] = useState(pokeData.baseExperience);
  const [height, setHeight] = useState(pokeData.height);
  const [weight, setWeight] = useState(pokeData.weight);
  //editing state
  const [isEditing, setIsEditing] = useState(false);
  // payload
  const payload = {
    baseExperience,
    height: Number(height),
    weight: Number(weight),
  };

  // console.log(pokeData);
  // console.log(payload);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    toast.success("Pokemon Deleted");
    await deletePokebyId(id);
    router.push("/");
  };

  const handleSaveClick = () => {
    editPokeData(id, payload);
    setIsEditing(false);
    toast.success("Pokemon edited successfully");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setBaseExperience(e.target.value)
                }
              />
              <Input
                id="Height"
                type="number"
                label="Height"
                value={height}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setHeight(e.target.value)
                }
              />
              <Input
                id="Weight"
                type="number"
                label="Weight"
                value={weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setWeight(e.target.value)
                }
              />
            </div>
          )}

          {/* button part */}
          {!isEditing ? (
            <div className="flex justify-center mt-6 gap-4">
              <button
                className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="w-32 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-6 gap-4">
              <button
                className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="w-32 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full"
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
