import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSideBar";
import axios from "axios";
import CardItems from "@/components/CardItems";

const HomePage = () => {
  // fetch data
  const [getData, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        const allData = data.results;
        // karena fetch data api bentuk promise jadi pakai konsep promise all untuk kecepatan data
        const detailedData = await Promise.all(
          allData.map(async (item) => {
            const response = await axios.get(item.url);
            return response.data;
          })
        );
        setData(detailedData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="full">
        <div className="w-full">
          <Navbar />
        </div>
        <SidebarProvider className="w-full flex-row relative">
          <AppSideBar />
          <div className="grid grid-cols-4 gap-2 w-full">
            {getData &&
              getData.map((items, i) => <CardItems key={i} item={items} />)}
          </div>
        </SidebarProvider>
      </div>
    </>
  );
};

export default HomePage;
