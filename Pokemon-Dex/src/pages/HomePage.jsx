import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSideBar";
import axios from "axios";
import CardItems from "@/components/CardItems";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  // fetch data
  const [getData, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(20);

  const getHomeData = async () => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
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

  // fungsi fetch more saat di scroll ke bawah
  const fetchMore = async () => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      const allData = data.results;

      const newData = await Promise.all(
        allData.map(async (item) => {
          const response = await axios.get(item.url);
          return response.data;
        })
      );
      setData((prevData) => [...prevData, ...newData]);
      setFilterData((prevData) => [...prevData, ...newData]);
      setOffset((prevOffset) => prevOffset + 20);

      if (allData.length === 0) {
        setHasMore(false);
      }
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

  // fungsi menambahkan favorite

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <>
      <main>
        <Navbar searchFeat={searchFeat} className="sticky" />
        <SidebarProvider className="w-full flex-row relative">
          <AppSideBar filterSearch={filterPokemon} className="sticky" />
          <div id="scrollableDiv" className="h-[100vh] overflow-auto">
            <InfiniteScroll
              dataLength={getData.length}
              hasMore={hasMore}
              next={fetchMore}
              scrollableTarget="scrollableDiv"
            >
              <div className="grid grid-cols-4 gap-2 w-full px-2 py-2 bg-[#1A1A1D]">
                {getData &&
                  getData.map((items, i) => <CardItems key={i} item={items} />)}
              </div>
            </InfiniteScroll>
          </div>
        </SidebarProvider>
      </main>
    </>
  );
};

export default HomePage;
