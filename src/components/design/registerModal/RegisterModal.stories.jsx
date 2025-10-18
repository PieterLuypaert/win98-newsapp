import "../../../styles/index.css";
import React from "react";
import { RegisterModal } from "./RegisterModal";

export default {
  title: "Design/RegisterModal",
  component: RegisterModal,
  argTypes: {
    onClose: { action: "onClose" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <div style={{ height: "100vh", background: "transparent" }}>
    <RegisterModal onClose={args.onClose} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
