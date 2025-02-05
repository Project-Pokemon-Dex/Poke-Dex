import React from "react";
import './CardItems.css';
import bg1 from "../assets/bg1.png";


const CardItems = ({ item }) => {
  return (
    <>
    <div className="card-content border-2 grid bg-[#1A1A1D] rounded-xl border-none overflow-hidden">
      <img src={bg1} className="object-cover" style={{height:"110px", width:"100%"}} alt="" />
      <div className="card-item px-4 py-4 text-xl text-white flex bg bg-neutral-800 gap-8">
        <div className="pokemon-info w-full">

          <div className="title-pokemon flex items-start gap-10 item ">
            <div className="poke-ball gap-2 w-full">
              <div className="flex items-center gap-2 py-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" style={{width:"32px", height:"32px"}} alt="" />
                <p className="id-info text-[12px] font-medium text-gray-100">#0001</p>
              </div>
              <div className="p-2">
                <h1 className="pokemon-name w-full font-bold capitalize">{item.name}</h1>
                <p className="type-info text-[14px] text-[#ffcb05] italic font-medium">Grass, Poison</p>
              </div>
            </div>
            <img className="pokemon-image hover:scale-110 transition duration-500" src={item.sprites.other.home.front_default} style={{width:"100px", height:"100px"}} alt="pokemon-char" />
          </div>

          <div className="btn pt-6 pb-1">
            <button className="button truncate w-full font-bold" >
              <div><span>Catch Pokemon</span></div>
            </button>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default CardItems;
