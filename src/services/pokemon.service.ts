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
export interface IPokemon {
  name: string;
  baseExperience: string;
  height: number;
  weight: number;
}

//IPokemonData
export interface IPokemonData extends IPokemon {
  id: string;
}

//Pokemon adding function
export const addPokemon = async (pokemonData: IPokemon) => {
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
  } catch (error: any | unknown) {
    console.error("Error adding Pokemon: ", error.message);
    return { success: false, error: error.message };
  }
};

//getting all pokemons
export const getAllPokemon = async () => {
  const pokemonData: IPokemonData[] = [];
  const querySnapshot = await getDocs(collection(db, "pokemons"));

  querySnapshot.forEach((doc) => {
    const pokemonInfo = doc.data() as IPokemon; // Explicit cast to IPokemon
    const pokemonWithId: IPokemonData = { id: doc.id, ...pokemonInfo };
    pokemonData.push(pokemonWithId);
  });
  //return value
  return pokemonData;
};

//getSpecific pokemon by ID
export const getPokemonbyId = async (docId: string) => {
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
    // console.log("Edited");
  } catch (err: any | unknown) {
    // console.log(err);
    // console.log(docId);
  }
};

//delete specific poke by id
export const deletePokebyId = async (docId: string) => {
  await deleteDoc(doc(db, "pokemons", docId)); // Specify the document reference using docId
};

//Search Pokemon by name
import { query, where } from "firebase/firestore";
export const searchPokemonByName = async (que: string) => {
  const filteredPokes: IPokemon[] | undefined = []
  const docRef = collection(db, "pokemons");
  // const q = query(docRef, where(`name`, "==", que)); 
  const q = query(
    docRef,
    where("name", ">=", que),
    where("name", "<=", que + "\uf8ff")
  );
  //
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    filteredPokes.push(doc.data() as IPokemon)
  })
  console.log("service log:", filteredPokes)
  return filteredPokes;
}
