import React from "react";
import "./Clippy.css";
import { Button } from "@design/Button/Button";

export const Clippy = ({
  message = "Welcome to my News App! Click me to chat!",
  isExpanded = false,
  chatHistory = [],
  userInput = "",
  isLoading = false,
  error = null,
  chatEndRef = null,
  onClippyClick = () => {},
  onSendMessage = () => {},
  onInputChange = () => {},
  onClearChat = () => {},
}) => {
  return (
    <div className="clippy-container">
      <div className={`clippy-window ${isExpanded ? "expanded" : ""}`}>
        <div className="clippy-title">
          <span className="clippy-title-text">
            {isExpanded ? "Clippy AI Assistant" : "Clippy says..."}
          </span>
          <div className="clippy-title-actions">
            {isExpanded && (
              <Button
                variant="win98"
                className="small"
                onClick={onClearChat}
                title="Clear chat history"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="clippy-body">
          {!isExpanded ? (
            <p className="clippy-message-simple">{message}</p>
          ) : (
            <>
              <div className="clippy-messages">
                <div className="clippy-msg assistant">
                  <div className="msg-bubble">{message}</div>
                </div>
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`clippy-msg ${msg.role}`}>
                    <div className="msg-bubble">{msg.content}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="clippy-msg assistant">
                    <div className="msg-bubble loading">Typing...</div>
                  </div>
                )}
                {error && (
                  <div className="clippy-error">
                    <small>Error: {error}</small>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="clippy-input-area">
                <input
                  type="text"
                  className="win98-input clippy-input-field"
                  value={userInput}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder="Ask Clippy anything..."
                  disabled={isLoading}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isLoading && userInput.trim()) {
                      onSendMessage();
                    }
                  }}
                />
                <Button
                  variant="win98"
                  onClick={onSendMessage}
                  disabled={isLoading || !userInput.trim()}
                >
                  Send
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className="clippy-character"
        onClick={onClippyClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClippyClick();
          }
        }}
        title={isExpanded ? "Minimize chat" : "Chat with me!"}
      >
        <img src="/assets/clippy.gif" alt="Clippy" />
      </div>
    </div>
  );
};

