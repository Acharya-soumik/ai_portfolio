"use client";
import { useState, useCallback, useRef, useEffect } from "react";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Send, Sparkle, X } from "lucide-react";
import axios from "axios";
import TypewriterText from "./TypewriterText";
import { LANGFLOW_CONFIG } from "../api/langflow/config";

const ChatInput = ({
  isLoading,
  setLoading,
}: {
  isLoading: boolean;
  setLoading: any;
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [response, setResponse] = useState<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [animateInput, setAnimateInput] = useState(false);
  const [animateResponse, setAnimateResponse] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setAnimateInput(true);
    setResponse(null);

    try {
      const result = await axios.post(
        "/api/langflow/run",
        {
          inputValue: text,
          inputType: "chat",
          outputType: "chat",
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LANGFLOW_CONFIG.APPLICATION_TOKEN}`,
          },
        }
      );
      setResponse(result.data);
      setAnimateResponse(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setText("");
    setResponse(null);
    setAnimateInput(false);
    setAnimateResponse(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [response]);

  return (
    <div className="w-full md:w-2/5 h-full flex flex-col justify-end md:justify-center space-y-4 z-10">
      <div
        className={`relative bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-lg transition-all duration-300 ${
          response ? "h-auto" : "h-[100px]" // Adjust height smoothly
        } overflow-hidden`}
      >
        <div className={`relative flex items-center gap-1`}>
          {!isLoading && !response && (
            <>
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-black/20 text-white rounded-xl px-4 py-3 pr-12 border border-yellow-400/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none placeholder:text-gray-400 text-lg transition-all duration-300"
                placeholder="Ask me anything..."
              />
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none hover:shadow-lg hover:shadow-yellow-400/20"
              >
                <Send className="w-5 h-5 text-gray-900" />
              </button>
            </>
          )}
          <div>
            {(isLoading || response?.message) && (
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Sparkle
                    className={`w-10 h-10 animate-spin text-orange-400`}
                  />
                ) : (
                  <Sparkle className={`w-10 h-10`} />
                )}

                <p className="text-gray-50 text-xl">{text}</p>
              </div>
            )}
            {isLoading && (
              <p className="animate-pulse text-gray-300 text-sm text-left pl-6">
                thinking...
              </p>
            )}
          </div>
        </div>

        {!isLoading && response && (
          <div
            className={`mt-4 bg-black/40 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-400 transform ${
              animateResponse
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"
            }`}
          >
            <TypewriterText
              text={response.message}
              className="text-white text-lg leading-relaxed"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
