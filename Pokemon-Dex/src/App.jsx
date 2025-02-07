import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSideBar";
import { createContext, useState } from "react";
import axios from "axios";

export const query = createContext();
function App() {
  const [getData, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(10);
  const [isLoad, setIsLoad] = useState(false);
  const [isQuery, setIsQuery] = useState(false);

  const navigate = useNavigate();

  const getHomeData = async () => {
    try {
      setIsLoad(true);
      setIsQuery(false);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
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
      setIsLoad(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  // fungsi fetch more saat di scroll ke bawah
  const fetchMore = async () => {
    try {
      setIsLoad(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
      );
      const allData = data.results;

      const newData = await Promise.all(
        allData.map(async (item) => {
          const response = await axios.get(item.url);
          return response.data;
        })
      );
      setData((prevData) => [...prevData, ...newData]);

      setOffset((prevOffset) => prevOffset + 10);

      if (allData.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // Mencari data dari query
  const searchFeat = async (query) => {
    if (!query) {
      setIsQuery(false);
      getHomeData();
      return;
    }
    navigate(`/?search=${query}`);
    setIsLoad(true);

    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1000`
    );
    const allData = data.results;
    const fetchAllPokemon = await Promise.all(
      allData.map(async (item) => {
        const response = await axios.get(item.url);
        return response.data;
      })
    );

    const filteredData = fetchAllPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    setData(filteredData);

    console.log(getData);
    setIsQuery(true);
    setIsLoad(false);
  };

  return (
    <>
      <query.Provider
        value={{
          getData,
          getHomeData,
          setData,
          hasMore,
          setHasMore,
          offset,
          setOffset,
          isLoad,
          setIsLoad,
          fetchMore,
          searchFeat,
          isQuery,
        }}
      >
        <Navbar className="sticky" searchFeat={searchFeat} />
        <SidebarProvider className="  w-full flex-row relative ">
          <AppSideBar className="sticky" />
          <Outlet />
        </SidebarProvider>
      </query.Provider>
    </>
  );
}

export default App;
