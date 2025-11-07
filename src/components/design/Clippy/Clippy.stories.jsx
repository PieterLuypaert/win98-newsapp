import React from "react";
import { Clippy } from "./Clippy";

export default {
  title: "Design/Clippy",
  component: Clippy,
  argTypes: {
    message: { control: "text" },
    isExpanded: { control: "boolean" },
    onClippyClick: { action: "onClippyClick" },
    onSendMessage: { action: "onSendMessage" },
    onInputChange: { action: "onInputChange" },
    onClearChat: { action: "onClearChat" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16 }}>
    <Clippy {...args} />
  </div>
);

export const Collapsed = Template.bind({});
Collapsed.args = {
  message: "Hi! I'm Clippy. Click me to open the chat.",
  isExpanded: false,
  chatHistory: [],
  userInput: "",
  isLoading: false,
  error: null,
};

export const ExpandedEmpty = Template.bind({});
ExpandedEmpty.args = {
  ...Collapsed.args,
  isExpanded: true,
};

export const ExpandedWithHistory = Template.bind({});
ExpandedWithHistory.args = {
  ...ExpandedEmpty.args,
  chatHistory: [
    { role: "assistant", content: "Hello! How can I help you today?" },
    { role: "user", content: "Show me the latest headlines." },
    { role: "assistant", content: "Here are some top stories..." },
  ],
};
