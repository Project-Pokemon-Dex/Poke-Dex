import axios from "axios";
import React, { useEffect, useState } from "react";

import bg1 from "../assets/bg1.png";
import { Link } from "react-router-dom";
import FavoriteCardItem from "@/components/FavoriteCardItem";

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
      console.log(pokemonId);
      await axios.delete(`http://localhost:3000/favorite/${pokemonId}`);
      setFav((prevFav) => prevFav.filter((item) => item.id !== pokemonId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to={"/"}>
        <button className="bg-yellow-300 text-white rounded-sm my-6 mx-4">
          Back to Home
        </button>
      </Link>
      <div className="grid grid-cols-4 gap-2 mx-3">
        {fav.length > 0 &&
          fav.map((item, i) => (
            <FavoriteCardItem key={i} item={item} handleDel={deleteData} />
          ))}
      </div>
    </div>
  );
};

export default Favorite;
