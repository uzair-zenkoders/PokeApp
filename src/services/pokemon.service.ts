// db import
import { db } from "./firebase-config";

// firebase methods import
import { collection, addDoc, getDocs } from "firebase/firestore";

//Pokemon adding function
export const addPokemon = async (pokemonData: any) => {
  try {
    const docRef = await addDoc(collection(db, "pokemons"), pokemonData);

    if (docRef.id) {
      return {
        success: true,
        message: "Pokemon added successfully",
        docId: docRef.id,
      };
    } else {
      throw new Error("Failed to add Pokemon");
    }
  } catch (error: any) {
    console.error("Error adding Pokemon: ", error.message);
    return { success: false, error: error.message };
  }
};

//Pokemon interface
export interface Pokemon {
  id: string;
  name: string;
  baseExperience: string;
  height: number;
  weight: number;
}

//getting all pokemons
export const getAllPokemon = async () => {
  const pokemonData: any = [];
  const querySnapshot = await getDocs(collection(db, "pokemons"));
  querySnapshot.forEach((doc) => {
    pokemonData.push({ id: doc.id, ...doc.data().payload }); //setting pokedata with id
  });

  return pokemonData;
};
