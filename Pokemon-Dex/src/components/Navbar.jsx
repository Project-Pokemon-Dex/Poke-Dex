import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <div className="bg-[#1A1A1D] w-full border-b-2 border-amber-100 text-white flex justify-between h-fit py-1.5 px-6">
      <h1>Pokemon-Dex</h1>
      <Input type="text" placeholder="Search Here" className="w-fit" />
    </div>
  );
};

export default Navbar;
