import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CardItems from "@/components/CardItems";
import InfiniteScroll from "react-infinite-scroll-component";

import { query } from "@/App";
import Loading from "@/components/Loading";

const HomePage = () => {
  const { getData, hasMore, fetchMore, isLoad, getHomeData, isQuery } =
    useContext(query);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    getHomeData();

    return () => {
      // Kembalikan scrollbar saat keluar dari homepage
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <main className="homePage w-full">
        <div
          id="scrollableDiv"
          className=" h-dvh overflow-auto  w-full bg-[#1A1A1D]"
        >
          <InfiniteScroll
            dataLength={getData.length}
            hasMore={hasMore && !isQuery}
            next={fetchMore}
            scrollableTarget="scrollableDiv"
            loader={isLoad && <Loading />}
          >
            <div className="grid grid-cols-4 gap-4 w-full px-5 py-2 bg-[#1A1A1D] h-full ">
              {getData.map((items, i) => (
                <CardItems key={i} item={items} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
};

export default HomePage;
