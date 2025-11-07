import React from "react";
import { LoginPrompt } from "./LoginPrompt";

export default {
  title: "Design/LoginPrompt",
  component: LoginPrompt,
  argTypes: {
    onClose: { action: "onClose" },
    onLogin: { action: "onLogin" },
    onRegister: { action: "onRegister" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, minWidth: 280 }}>
    <LoginPrompt {...args} />
  </div>
);

export const InSidebar = Template.bind({});
InSidebar.args = {
  title: "Login to save articles",
  children: null,
};
// render InSidebar inside a sidebar wrapper to demonstrate .article-sidebar rules
InSidebar.decorators = [
  (Story) => (
    <div
      className="article-sidebar"
      style={{
        width: 320,
        padding: 8,
        background: "transparent",
      }}
    >
      <Story />
    </div>
  ),
];
