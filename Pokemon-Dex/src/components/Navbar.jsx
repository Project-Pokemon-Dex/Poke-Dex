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
      <div className="bg-[#1A1A1D] w-full border-amber-100 text-white flex justify-between h-fit p-4 px-16">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          className="w-28 h-10"
          alt="pokemon-logo"
        />

        <div className="flex gap-5">
          <button
            onClick={play}
            className="menu-favorite flex items-center gap-3 font-medium bg-blue-800 px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            <img
              src={Pokedex}
              style={{ width: "30px", height: "30px" }}
              alt=""
            />
            <Link to={"/favorite"}>
              <button className="text-white text-[14px]">My Pokemon</button>
            </Link>
          </button>

          <div className="flex items-center gap-2 relative">
            <Input
              type="text"
              placeholder="Search Pokemon..."
              className="w-fit bg-neutral-800 text-gray-500 font-medium border-none outline-none rounded-full pr-14 py-6"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="search-btn px-5 py-2 rounded-full bg-[#ffcb05] text-[#292524] font-semibold absolute left-36 text-sm hover:bg-yellow-500"
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
