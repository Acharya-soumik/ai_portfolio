"use client";
import { useState } from "react";
import BackgroundOrbs from "./components/BackgroundOrbs";
import ChatInput from "./components/ChatInput";
import LottieContainer from "./components/LottieContainer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <BackgroundOrbs />
      <div className=" flex h-full flex-col-reverse md:flex-row justify-center items-center">
        <div className="relative flex-1 w-full flex flex-col items-center space-y-8 rounded-xl px-4 py-6 bg-transparent shadow-lg">
          {/* Subtle neon border glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur" />

          <ChatInput isLoading={loading} setLoading={setLoading} />
        </div>
        <div className="flex-1 flex justify-center items-center ">
          <div className="relative group">
            <div
              className={`
        absolute inset-0
        bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
        rounded-full
        ${loading ? "animate-spin" : ""}
      `}
            />

            <LottieContainer loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
