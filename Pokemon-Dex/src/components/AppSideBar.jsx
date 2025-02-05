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
  SidebarSeparator,
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
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className=" h-full absolute  border-t-2 z-0"
      >
        <SidebarContent>
          <SidebarGroup>
            <div className="">
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarSeparator />
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {type.map((item) => {
                  // Cari data tipe yang cocok berdasarkan nama
                  const matchingType = typeData.find(
                    (data) =>
                      data.name.toLowerCase() === item.title.toLowerCase()
                  );

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <button onClick={() => filterSearch(item.title)}>
                          {typeof item.icon === "string" ? (
                            <img
                              src={item.icon}
                              alt={item.title}
                              className="w-6 h-6 mr-2"
                            />
                          ) : (
                            <item.icon />
                          )}

                          <span>{item.title}</span>

                          <SidebarMenuBadge>
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
