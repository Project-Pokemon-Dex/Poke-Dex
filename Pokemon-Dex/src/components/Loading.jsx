import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const Loading = () => {
  return (
    <div className="  h-full w-full flex justify-center items-center bg-[#1A1A1D]">
      <DotLottieReact
        src="https://lottie.host/86852889-c608-49f3-9221-95cf40165d32/te14vdWZLn.lottie"
        loop
        autoplay
        className="w-[50%]"
      />
    </div>
  );
};

export default Loading;
