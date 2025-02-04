import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSideBar";
import axios from "axios";
import CardItems from "@/components/CardItems";

const HomePage = () => {
  // fetch data
  const [getData, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const getHomeData = async () => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=500&offset=20`
      );
      const allData = data.results;
      // karena fetch data api bentuk promise jadi pakai konsep promise all untuk kecepatan data
      const detailedData = await Promise.all(
        allData.map(async (item) => {
          const response = await axios.get(item.url);
          return response.data;
        })
      );
      setData(detailedData);
      setFilterData(detailedData);
    } catch (error) {
      console.log(error);
    }
  };

  // Mencari data dari query
  const searchFeat = (query) => {
    if (!query) {
      getHomeData(); // Jika input kosong, tampilkan semua data
      return;
    }

    const filteredData = filterData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    setData(filteredData);
  };

  // mencari berdasarkan types
  const filterPokemon = (typeValue) => {
    const filterByType = filterData.filter((pokemon) =>
      pokemon.types.some(
        (t) => t.type.name.toLowerCase() === typeValue.toLowerCase()
      )
    );
    setData(filterByType);
    console.log(getData);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <>
      <main>
        <Navbar searchFeat={searchFeat} />
        <SidebarProvider className="w-full flex-row relative">
          <AppSideBar filterSearch={filterPokemon} />
          <div className="grid grid-cols-4 gap-2 w-full px-2 py-2 bg-[#1A1A1D]">
            {getData &&
              getData.map((items, i) => <CardItems key={i} item={items} />)}
          </div>
        </SidebarProvider>
      </main>
    </>
  );
};

export default HomePage;
