import React from "react";
import bg1 from "../assets/bg1.png";
import { useNavigate } from "react-router-dom";

const FavoriteCardItem = ({ item, handleDel }) => {
  const navigate = useNavigate();
  return (
    <div className="card-content border-2 grid bg-[#1A1A1D] rounded-xl border-none overflow-hidden hover:scale-95 transition duration-500"
    >
      <img
        src={bg1}
        className="object-cover"
        style={{ height: "110px", width: "100%" }}
      />
      <div className="card-item px-4 py-4 text-xl text-white flex bg bg-neutral-800 gap-8 ">
        <div className="pokemon-info w-full">
          <div className="title-pokemon flex items-start gap-3 item ">
            <div className="poke-ball gap-2 w-full">
              <div className="flex items-center gap-2 py-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
                  style={{ width: "32px", height: "32px" }}
                  alt=""
                />
                <p className="id-info text-[12px] font-medium text-gray-100">
                  #00{item.id}
                </p>
              </div>
              <div className="p-2">
                <h1 className="pokemon-name w-full font-bold capitalize">
                  {item.name}
                </h1>
                <div className="flex gap-2">
                  {item.types.map((type, i) => (
                    <p
                      key={i}
                      className="type-info text-[14px] text-[#ffcb05] italic font-medium"
                    >
                      {type.type.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <img
              className="pokemon-image hover:scale-110 transition duration-500"
              src={item.sprites.other.home.front_default}
              style={{ width: "100px", height: "100px" }}
              alt="pokemon-char"
            />
          </div>

          <div className="btn pt-6 pb-1">
            <button
              className="button truncate w-full font-bold"
              onClick={(e) => {e.stopPropagation();
                handleDel(item.id.toString())}}
            >
              
              <div>
                <span>Delete</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCardItem;
