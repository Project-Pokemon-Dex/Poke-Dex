import React from "react";

const CardItems = ({ item }) => {
  console.log(item);
  return (
    <div className="border-2 grid">
      <div className="border-2">
        <h1>{item.name}</h1>
      </div>
      <div>
        <img src={item.sprites.other.home.front_default} alt="" />
      </div>
    </div>
  );
};

export default CardItems;
