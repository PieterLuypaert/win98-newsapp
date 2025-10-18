import "../../../styles/index.css";
import React from "react";
import { LoginModal } from "./LoginModal";

export default {
  title: "Design/LoginModal",
  component: LoginModal,
  argTypes: {
    onClose: { action: "onClose" },
    onRegister: { action: "onRegister" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <div style={{ height: "100vh", background: "transparent" }}>
    <LoginModal {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
