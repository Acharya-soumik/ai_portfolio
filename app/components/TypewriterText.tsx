"use client";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
    }
  }, [currentIndex, text, speed, isTyping]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-0.5 h-5 bg-purple-500 ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
};

export default TypewriterText;
