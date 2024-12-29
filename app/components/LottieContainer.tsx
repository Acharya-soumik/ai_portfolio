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
    <div className="w-full md:w-3/5 h-1/2 md:h-full flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        {lottieJson && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="p-2 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-500/50">
              <Lottie
                className="relative rounded-full
                      shadow-2xl shadow-purple-500/20
                      transform transition-all duration-300
                      group-hover:scale-105
                      group-hover:shadow-yellow-400/25
                      h-48 w-48 md:h-96 md:w-96
                      backdrop-blur-xl bg-[rgba(255,255,252,0.6)]"
                loop
                animationData={lottieJson}
                play={loading}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default LottieContainer;
