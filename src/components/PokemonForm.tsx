//react imports
import React, { useState } from "react";
import { Fragment } from "react";

//flowbite(react) imports
import { Label, TextInput, Button } from "flowbite-react";

//react toast import
import toast, { Toaster } from "react-hot-toast";

//firebase crud functions import
import { addPokemon } from "../services/pokemon.service";

const PokemonForm = () => {
  const [name, setName] = useState("");
  const [baseExperience, setBaseExperience] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  //clear function after successful submission
  const resetFields = () => {
    setName("");
    setBaseExperience("");
    setHeight(0);
    setWeight(0);
  };

  const handleOnSubmit = () => {
    if (name && baseExperience && height && weight) {
      const payload = {
        name,
        baseExperience,
        height,
        weight,
      };
      //firestore function for adding data to firestore
      addPokemon({ payload });
      console.log("Payload:", payload);
      toast.success("Pokemon added successfully");
      //reset fields
      resetFields();
    } else {
      // Show error toast for incomplete fields
      toast.error("Please fill in all the fields");
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center py-20 sm:pl-0 sm:pr-0 pl-3 pr-3">
        <div className="bg-black bg-opacity-20 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h1 className="text-4xl text-center mb-6">Add Pokemon!</h1>
          <div>
            <div className="my-2 block">
              <Label htmlFor="small" value="Name:" />
            </div>
            <TextInput
              id="base"
              type="text"
              sizing="md"
              placeholder="Pokemon's Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="my-2 mt-5 block">
              <Label htmlFor="base" value="Base Encounter:" />
            </div>
            <TextInput
              id="base"
              type="text"
              sizing="md"
              placeholder="Pokemon's BaseExperience"
              value={baseExperience}
              onChange={(e) => {
                setBaseExperience(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="my-2 mt-5 block">
              <Label htmlFor="large" value="Height:" />
            </div>
            <TextInput
              id="base"
              type="number"
              sizing="md"
              placeholder="Pokemon's Height"
              value={height}
              onChange={(e) => {
                const parsedValue = parseFloat(e.target.value); // Parse the string value to a number
                if (!isNaN(parsedValue)) {
                  setHeight(parsedValue); // Set the parsed number value
                } else {
                  setHeight(0); // Or handle the case when the input is not a valid number
                }
              }}
            />
          </div>
          <div>
            <div className="my-2 mt-5 block">
              <Label htmlFor="large" value="Weight:" />
            </div>
            <TextInput
              id="base"
              type="number"
              sizing="md"
              placeholder="Pokemon's Weight"
              value={weight}
              onChange={(e) => {
                const parsedValue = parseFloat(e.target.value);
                if (!isNaN(parsedValue)) {
                  setWeight(parsedValue);
                } else {
                  setWeight(0);
                }
              }}
            />
          </div>
          <div className="mt-12 flex justify-center">
            <Button
              className="bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white"
              type="submit"
              onClick={handleOnSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
    </Fragment>
  );
};

export default PokemonForm;
