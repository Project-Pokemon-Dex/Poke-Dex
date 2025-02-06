import React, { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import type from "./type";
import axios from "axios";

const AppSideBar = ({ filterSearch }) => {
  const [typeData, setTypeData] = useState([]);

  const getTypeList = async () => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/type/`);
      const allData = data.results;

      const typeData = await Promise.all(
        allData.map(async (item) => {
          const response = await axios.get(item.url);
          return response.data;
        })
      );
      setTypeData(typeData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTypeList();
  }, []);

  return (
    <div>
      <Sidebar style={{ border: "none" }}
        variant="sidebar"
        collapsible="icon"
        className=" h-full absolute z-0">
        <SidebarContent style={{ backgroundColor: "#1A1A1D" }}>
          <SidebarGroup>
            <SidebarGroupContent style={{ cursor: "none" }}>
              <SidebarMenu style={{ gap: "12px" }}>
                {type.map((item) => {
                  // Cari data tipe yang cocok berdasarkan nama
                  const matchingType = typeData.find(
                    (data) =>
                      data.name.toLowerCase() === item.title.toLowerCase()
                  );

                  return (
                    <SidebarMenuItem key={item.title} style={{ color: "gray" }}>
                      <SidebarMenuButton asChild style={{ fontSize: "16px", fontStyle: "normal" }}>
                        <button className="py-6" onClick={() => filterSearch(item.title)}>
                          {typeof item.icon === "string" ? (
                            <img
                              src={item.icon}
                              alt={item.title}
                              className="w-8 h-8 mr-1 font-semibold"
                            />
                          ) : 
                          (
                            <item.icon/>
                          )}

                          <span>{item.title}</span>

                          <SidebarMenuBadge style={{ fontSize: "16px", fontStyle: "normal", color: "gray", padding: "10px" }}>
                            {matchingType ? matchingType.pokemon.length : ""}
                          </SidebarMenuBadge>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSideBar;
