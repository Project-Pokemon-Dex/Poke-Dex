import React, { useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardItems from "@/components/CardItems";
import Loading from "@/components/Loading";
import { query } from "@/App";

const HomePage = () => {
  const { getData, hasMore, fetchMore, isLoad, getHomeData, isQuery } =
    useContext(query);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    getHomeData();

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <main className="w-full h-screen bg-[#1A1A1D]">
      <div id="scrollableDiv" className="h-full overflow-auto w-full">
        <InfiniteScroll
          dataLength={getData.length}
          hasMore={hasMore && !isQuery}
          next={fetchMore}
          scrollableTarget="scrollableDiv"
          loader={isLoad && <Loading />}
        >
          {/* Grid responsif */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-4">
            {getData.map((items, i) => (
              <CardItems key={i} item={items} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default HomePage;
