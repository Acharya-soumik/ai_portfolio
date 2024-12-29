"use client";
import { useState, useEffect, useRef } from "react";

const TypewriterText = ({
  text,
  className = "",
  speed = 50,
}: {
  text: string;
  className?: string;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        // Auto-scroll to bottom when new text is added
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
    }
  }, [currentIndex, text, speed, isTyping]);

  return (
    <div
      ref={containerRef}
      className="max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/50 hover:scrollbar-thumb-purple-500 transition-colors duration-200"
    >
      <p className={`inline-block ${className} max-w-full`}>
        {displayedText}
        {isTyping && (
          <span className="inline-block w-0.5 h-5 bg-purple-500 ml-1 animate-pulse align-middle" />
        )}
      </p>
    </div>
  );
};

export default TypewriterText;
