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
import { Link } from "react-router-dom";

const AppSideBar = () => {
  return (
    <div>
      <Sidebar
        style={{ border: "none" }}
        variant="sidebar"
        collapsible="icon"
        className=" h-full absolute z-0 hidden"
      >
        <SidebarContent style={{ backgroundColor: "#1A1A1D" }}>
          <SidebarGroup>
            <SidebarGroupContent style={{ cursor: "none" }}>
              <SidebarMenu style={{ gap: "12px" }}>
                {type.map((item) => (
                  <SidebarMenuItem key={item.title} style={{ color: "gray" }}>
                    <SidebarMenuButton
                      asChild
                      style={{ fontSize: "16px", fontStyle: "normal" }}
                    >
                      <Link to={`/${item.url}`}>
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="w-8 h-8"
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSideBar;
