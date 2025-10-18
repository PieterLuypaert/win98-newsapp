import "../../../styles/index.css";
import React from "react";
import { Separator } from "./Separator";

export default {
  title: "Design/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => (
  <div style={{ padding: 16 }}>
    <div
      className="taskbar"
      style={{ display: "flex", alignItems: "center", height: 56 }}
    >
      <Separator {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
