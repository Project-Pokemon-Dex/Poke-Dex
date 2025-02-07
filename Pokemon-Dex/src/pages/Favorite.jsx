import axios from "axios";
import React, { useEffect, useState } from "react";

import bg1 from "../assets/bg1.png";
import { Link } from "react-router-dom";
import FavoriteCardItem from "@/components/FavoriteCardItem";
import { toast } from "react-toastify";

const Favorite = () => {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const getFavList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/favorite`);
        setFav(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFavList();
  }, []);

  //   fungsi delete item dari favorite
  const deleteData = async (pokemonId) => {
    try {
      await axios.delete(`http://localhost:3000/favorite/${pokemonId}`);
      setFav((prevFav) => prevFav.filter((item) => item.id !== pokemonId));
      toast.success("Pokemon removed from favorites!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#1A1A1D] w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-4">
        {fav.length > 0 &&
          fav.map((item, i) => (
            <FavoriteCardItem key={i} item={item} handleDel={deleteData} />
          ))}
      </div>
    </div>
  );
};

export default Favorite;
