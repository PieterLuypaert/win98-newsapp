import "../styles/index.css";
import React from "react";
import { Taskbar } from "./Taskbar";

export default {
  title: "Design/Taskbar",
  component: Taskbar,
  argTypes: {
    time: { control: "text" },
    showFullscreenButton: { control: "boolean" },
    onFullscreen: { action: "onFullscreen" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16 }}>
    <Taskbar
      time={args.time}
      showFullscreenButton={args.showFullscreenButton}
      onFullscreen={args.onFullscreen}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  time: new Date().toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  showFullscreenButton: true,
};

export const WithoutFullscreen = Template.bind({});
WithoutFullscreen.args = {
  ...Default.args,
  showFullscreenButton: false,
};
