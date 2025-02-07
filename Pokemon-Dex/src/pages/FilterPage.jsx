import { query } from "@/App";
import CardItems from "@/components/CardItems";
import Loading from "@/components/Loading";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      {isLoad ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 gap-4 w-full px-5 py-12 bg-[#1A1A1D] overflow-auto">
          {data &&
            data.map((items) => <CardItems key={items.id} item={items} />)}
        </div>
      )}
    </div>
  );
};

export default FilterPage;
