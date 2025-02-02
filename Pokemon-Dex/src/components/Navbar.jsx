import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-[#1A1A1D] w-full border-b-2 border-amber-100 text-white flex justify-between h-fit p-1.5 px-6 ">
      <h1>Pokemon-Dex</h1>
      <div>
        <Input type="text" placeholder="Search Here" className="w-fit" />
      </div>
    </div>
  );
};

export default Navbar;
