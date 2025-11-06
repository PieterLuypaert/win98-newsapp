import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { playSound } from "@core/utils/playSound";
import * as Storage from "@core/storage";
import { sendMessageToAI } from "@core/modules/ai/openrouter.api";
import { Clippy } from "@design/Clippy/Clippy";

export const ClippyContainer = ({
  message = "Welcome to my News App! Click me to chat!",
  autoShow = true,
  soundEnabled = true,
}) => {
  const navigate = useNavigate();
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

    const text = userInput;
    const userMsg = { role: "user", content: text };
    const baseHistory = [...chatHistory, userMsg];
    setChatHistory(baseHistory);
    setUserInput("");
    setIsLoading(true);
    setError(null);

    const raw = text.trim();
    const lower = raw.toLowerCase();

    const saveReply = (reply, path) => {
      if (path) navigate(path);
      const replyMsg = { role: "assistant", content: reply };
      const h = [...baseHistory, replyMsg];
      setChatHistory(h);
      Storage.saveClippyChatHistory(h);
      setIsLoading(false);
    };

    // Slash commands like "/news" or "/category/tech"
    if (raw.startsWith("/")) {
      if (lower === "/news") return saveReply("Opening News...", "/news");
      if (lower === "/bookmarks")
        return saveReply("Opening Bookmarks...", "/bookmarks");
      if (lower === "/login") return saveReply("Opening Login...", "/login");
      if (lower === "/register")
        return saveReply("Opening Register...", "/register");
      if (lower.startsWith("/category/")) {
        const slug = raw.split("/")[2];
        if (slug)
          return saveReply(`Opening category ${slug}...`, `/category/${slug}`);
      }
      return saveReply("Onbekend commando. Gebruik '/news' of 'open <name>'.");
    }

    // "open ..." style commands (explicit)
    if (lower.startsWith("open ")) {
      const target = lower.slice(5).trim();
      if (target === "news") return saveReply("Opening News...", "/news");
      if (target === "bookmarks")
        return saveReply("Opening Bookmarks...", "/bookmarks");
      if (target === "login") return saveReply("Opening Login...", "/login");
      if (target === "register" || target === "signup")
        return saveReply("Opening Register...", "/register");
      if (target.startsWith("category ")) {
        const slug = target.split(/\s+/)[1];
        if (slug)
          return saveReply(`Opening category ${slug}...`, `/category/${slug}`);
      }

      if (!target.includes(" ")) {
        const slug = target;
        return saveReply(`Opening category ${slug}...`, `/category/${slug}`);
      }

      return saveReply(
        "Onbekend 'open' doel. Probeer 'open news' of 'open category <slug>'."
      );
    }

    // anders: fallback naar AI
    try {
      const ai = await sendMessageToAI(text, chatHistory);
      const aiMsg = { role: "assistant", content: ai };
      const final = [...baseHistory, aiMsg];
      setChatHistory(final);
      Storage.saveClippyChatHistory(final);
    } catch (err) {
      console.error("Clippy AI error:", err);
      const errMsg = {
        role: "assistant",
        content: "Sorry, er is iets misgegaan met de AI-service.",
      };
      const final = [...baseHistory, errMsg];
      setChatHistory(final);
      Storage.saveClippyChatHistory(final);
      setError(err.message || "AI error");
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
