import React from "react";
import { Link } from "react-router-dom";

const CardItems = ({ item }) => {
  return (
    <Link to={`/pokemon/${item.name}`}>
      <div className="border-2 grid hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer bg-gray-800 rounded-lg p-4">
        <div className="border-b-2 pb-2 text-center">
          <h1 className="text-xl font-bold capitalize text-white">{item.name}</h1>
        </div>
        <div className="flex justify-center mt-2">
          <img
            src={item.sprites.other.home.front_default}
            alt={item.name}
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default CardItems;
