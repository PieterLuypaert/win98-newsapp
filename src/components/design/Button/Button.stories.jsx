import "@styles/index.css";
import React from "react";
import { Button } from "./Button";

export default {
  title: "Design/Button",
  component: Button,
  argTypes: {
    children: { control: "text", name: "Label" },
    variant: { control: { type: "select", options: ["default", "win98"] } },
    className: { control: "text" },
    autoFocus: { control: "boolean" },
    onClick: { action: "onClick" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16 }}>
    <Button {...args}>{args.children}</Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me",
  variant: "win98",
  className: "",
  autoFocus: false,
};
