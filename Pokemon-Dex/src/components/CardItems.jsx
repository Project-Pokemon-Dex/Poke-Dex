import React from "react";
import './CardItems.css';

const CardItems = ({ item }) => {
  return (
    <>
    <div className="card-content border-2 grid bg-[#1A1A1D] rounded-xl border-none overflow-hidden">
      <div className="card-item px-4 py-4 text-xl text-white flex bg bg-neutral-800 gap-8">
        <div className="pokemon-info w-full">

          <div className="title-pokemon flex items-start gap-10 item pb-">
            <div className="poke-ball flex gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" style={{width:"32px", height:"32px"}} alt="" />
              <div className="">
                <h1 className="pokemon-name w-full font-bold">{item.name}</h1>
                <p className="id-info text-[12px] font-medium text-[#ffcb05] italic">ID:0001</p>
              </div>
            </div>
            <img className="pokemon-image hover:scale-110 transition duration-500" src={item.sprites.other.home.front_default} style={{width:"100px", height:"100px"}} alt="pokemon-char" />
          </div>

          {/* <h5 className="type-info text-[16px] font-normal ">Type</h5> */}
          <div className="btn pt-6 pb-1">
            <button className="button truncate w-full font-bold" >
              <div><span>Add to Favorites</span></div>
            </button>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default CardItems;
