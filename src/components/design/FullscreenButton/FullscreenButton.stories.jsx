import "@styles/index.css";
import React from "react";
import { FullscreenButton } from "./FullscreenButton";

export default {
  title: "Design/FullscreenButton",
  component: FullscreenButton,
  argTypes: {
    onClick: { action: "onClick" },
  },
};

const Template = (args) => (
  <div
    style={{ padding: 16, display: "inline-block", background: "transparent" }}
  >
    <FullscreenButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
