import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
/* eslint-disable  @typescript-eslint/no-explicit-any */

const LottieContainer = ({ loading }: { loading: boolean }) => {
  const [lottieJson, setLottieJson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { default: jsonData } = await import("../lottie/lottie.json");
        setLottieJson(jsonData as any);
      } catch (error) {
        console.error("Error loading Lottie JSON:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {lottieJson && (
        <div className="relative group m-1">
          <div className="bg-white rounded-full">
            <Lottie
              className="bg-white rounded-full shadow-2xl
                         transform transition-all duration-300 
                         group-hover:scale-105 group-hover:shadow-purple-500/25 
                         h-48 w-48 md:h-96 md:w-96"
              loop
              animationData={lottieJson}
              play={loading}
            />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default LottieContainer;
