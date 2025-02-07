import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import Pokedex from "../assets/Pokedex.png";
import sound2 from "../components/sound2.mp3";

const Navbar = ({ searchFeat }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  function play() {
    new Audio(sound2).play();
  }

  return (
    <nav>
      <div className="bg-[#1A1A1D] w-full border-amber-100 text-white flex justify-between h-fit p-4 md:px-16">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          className="md:w-28 md:h-10  w-20 h-10 object-contain"
          alt="pokemon-logo"
        />

        <div className="flex md:gap-5 gap-2 ">
          <Link to={"/favorite"}>
            <button
              onClick={play}
              className="menu-favorite flex items-center gap-3 font-medium bg-blue-800 md:px-3 md:py-3 px-2 py-1.5 rounded-lg hover:bg-blue-700 md:mt-1 mt-1.5"
            >
              <img
                src={Pokedex}
                className="md:w-[30px] md:h-30px w-[24px] h-[24px]"
              />
              <button className="text-white md:text-[14px] text-[8px] ">
                My Pokemon
              </button>
            </button>
          </Link>

          <div className="flex items-center gap-2 relative">
            <Input
              type="text"
              placeholder="Search Pokemon..."
              className="w-fit bg-neutral-800 text-gray-500 font-medium border-none outline-none rounded-full md:pr-14 md:py-6 text-[9px] md:text-lg py-1 px-4"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="search-btn md:px-5 md:py-2 px-1.5 py-1 rounded-full bg-[#ffcb05] text-[#292524] font-semibold absolute md:left-48 left-24 md:text-sm text-[8px] hover:bg-yellow-500"
              onClick={() => {
                searchFeat(query), navigate(`/search?=${query}`);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
