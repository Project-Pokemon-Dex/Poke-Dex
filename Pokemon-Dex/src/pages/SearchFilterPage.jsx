import { query } from "@/App";
import CardItems from "@/components/CardItems";
import Loading from "@/components/Loading";
import React, { useContext, useEffect } from "react";

const SearchFilterPage = () => {
  const { getData, isLoad } = useContext(query);
  console.log(getData);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  });
  return (
    <div className="h-screen overflow-y-auto bg-[#1A1A1D] w-full">
      {isLoad ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 gap-4 w-full px-5 py-12 bg-[#1A1A1D] overflow-auto">
          {getData &&
            getData.map((items) => <CardItems key={items.id} item={items} />)}
        </div>
      )}
    </div>
  );
};

export default SearchFilterPage;
