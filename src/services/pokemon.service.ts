// db import
import { db } from "./firebase-config";

// firebase methods import
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

//Pokemon interface
export interface Pokemon {
  id: string;
  name: string;
  baseExperience: string;
  height: number;
  weight: number;
}

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

//getting all pokemons
export const getAllPokemon = async () => {
  const pokemonData: any = [];
  const querySnapshot = await getDocs(collection(db, "pokemons"));
  querySnapshot.forEach((doc) => {
    pokemonData.push({ id: doc.id, ...doc.data() }); //setting pokedata with id
  });

  return pokemonData;
};

//getSpecific pokemon by ID
export const getPokemonbyId = async (docId: any) => {
  const docRef = doc(db, "pokemons", docId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
};

// edit pokedata
export const editPokeData = async (
  docId: string,
  pokeData: { height: number; weight: number; baseExperience: string }
) => {
  try {
    await updateDoc(doc(db, "pokemons", docId), pokeData);
    console.log("Edited");
  } catch (err) {
    console.log(err);
    console.log(docId);
  }
};

//delete specific poke by id
export const deletePokebyId = async (docId: any) => {
  await deleteDoc(doc(db, "pokemons"));
};
