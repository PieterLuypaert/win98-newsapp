import React, { useState, useEffect, useRef } from "react";
import { playSound } from "@core/utils/playSound";
import * as Storage from "@core/storage";
import { sendMessageToAI } from "@core/modules/ai/openrouter.api";
import { Clippy } from "@design/Clippy/Clippy";

export const ClippyContainer = ({
  message = "Welcome to my News App! Click me to chat!",
  autoShow = true,
  soundEnabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasShown, setHasShown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatHistory, setChatHistory] = useState(() =>
    Storage.getClippyChatHistory()
  );
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (autoShow && !hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoShow, hasShown]);

  useEffect(() => {
    if (isExpanded && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isExpanded]);

  const handleClippyClick = () => {
    if (soundEnabled) {
      playSound("/assets/sounds/clippy.mp3");
    }
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const newMessage = { role: "user", content: userInput };
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setUserInput("");
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToAI(userInput, chatHistory);
      const responseMessage = { role: "assistant", content: aiResponse };
      const finalHistory = [...updatedHistory, responseMessage];
      setChatHistory(finalHistory);
      Storage.saveClippyChatHistory(finalHistory);
    } catch (err) {
      console.error("Clippy AI error:", err);
      setError(err.message || "Failed to get response");
      const errorMessage = {
        role: "assistant",
        content:
          "Sorry, I couldn't process that. Make sure the OpenRouter API key is configured correctly!",
      };
      const errorHistory = [...updatedHistory, errorMessage];
      setChatHistory(errorHistory);
      Storage.saveClippyChatHistory(errorHistory);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    Storage.clearClippyChatHistory();
    setError(null);
  };

  if (!isVisible) return null;

  return (
    <Clippy
      message={message}
      isExpanded={isExpanded}
      chatHistory={chatHistory}
      userInput={userInput}
      isLoading={isLoading}
      error={error}
      chatEndRef={chatEndRef}
      onClippyClick={handleClippyClick}
      onSendMessage={handleSendMessage}
      onInputChange={setUserInput}
      onClearChat={handleClearChat}
    />
  );
};

export default ClippyContainer;
