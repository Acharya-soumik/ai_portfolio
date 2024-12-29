"use client";
import { useState } from "react";
import BackgroundOrbs from "./components/BackgroundOrbs";
import ChatInput from "./components/ChatInput";
import LottieContainer from "./components/LottieContainer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <BackgroundOrbs />
      <div className="relative w-full h-full flex flex-col-reverse items-center justify-between gap-6">
        <ChatInput isLoading={loading} setLoading={setLoading} />
        <LottieContainer loading={loading} />
      </div>
    </>
  );
}
