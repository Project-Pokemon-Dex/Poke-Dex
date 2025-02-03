import React from "react";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <nav>
      <div className="bg-[#1A1A1D] w-full border-amber-100 text-white flex justify-between h-fit p-4 px-16">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" className="w-28 h-10" alt="pokemon-logo" />
        <Input type="text" placeholder="Search Pokemon..." className="w-fit bg-neutral-800 text-gray-50000 font-medium border-none outline-none" /> 
      </div>
    </nav>
  );
};

export default Navbar;
