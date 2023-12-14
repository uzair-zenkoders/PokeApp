import React from "react";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface PropsInterface {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NewSearchBar: React.FC<PropsInterface> = ({ value, onChange }) => {
  return (
    <form className="w-[1000px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Search for Pokemon by their names"
          className="w-full p-4 rounded-full bg-white text-yellow-700 border-yellow-200"
          onChange={onChange}
          value={value}
        />
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-yellow-400 rounded-full prev"
          onClick={(event) => event.preventDefault()}
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default NewSearchBar;
