import { query } from "@/App";
import CardItems from "@/components/CardItems";
import Loading from "@/components/Loading";
import type from "@/components/type";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FilterPage = () => {
  const [data, setData] = useState([]);
  const { isLoad, setIsLoad } = useContext(query);

  const { id } = useParams();

  const getPokemonByType = async () => {
    try {
      setIsLoad(true);
      const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);

      const allPokemon = data.pokemon;
      const fetchPokemon = await Promise.all(
        allPokemon.map(async (item) => {
          const response = await axios.get(item.pokemon.url);

          return response.data;
        })
      );
      setData(fetchPokemon);
      setIsLoad(false);
    } catch (error) {
      alert("Please Refresh the page!");
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getPokemonByType();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [id]);

  return (
    <div className="h-screen overflow-y-auto bg-[#1A1A1D] w-full">
      <div className="flex gap-3 overflow-x-auto text-white md:hidden custom-scroll">
        {type &&
          type.map((genre) => (
            <Link to={`/${genre.url}`}>
              <button className="rounded-full text-xs border-[#facc15] border px-5 py-1 hover:bg-[#facc15] hover:text-white font-medium">
                {genre.title}
              </button>
            </Link>
          ))}
      </div>
      {isLoad ? (
        <Loading />
      ) : (
        <div className=" w-full  bg-[#1A1A1D] overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-4">
          {data &&
            data.map((items) => <CardItems key={items.id} item={items} />)}
        </div>
      )}
    </div>
  );
};

export default FilterPage;
