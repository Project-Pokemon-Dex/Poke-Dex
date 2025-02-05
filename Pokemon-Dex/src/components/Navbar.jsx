import React, { useState } from "react";
import { Input } from "./ui/input";

const Navbar = ({ searchFeat }) => {
  const [query, setQuery] = useState("");
  return (
    <nav>
      <div className="bg-[#1A1A1D] w-full border-amber-100 text-white flex justify-between h-fit p-4 px-16">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          className="w-28 h-10"
          alt="pokemon-logo"
        />
        <div className="flex items-center gap-2 relative">
          <Input
            type="text"
            placeholder="Search Pokemon..."
            className="w-fit bg-neutral-800 text-gray-500 font-medium border-none outline-none rounded-full pr-14 py-6"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn px-5 py-2 rounded-full bg-[#ffcb05] text-[#292524] font-semibold absolute left-36 text-sm hover:bg-yellow-500" onClick={() => searchFeat(query)}>Search</button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
