import "../../../styles/index.css";
import React from "react";
import { TaskbarTime } from "./TaskbarTime";

export default {
  title: "Design/TaskbarTime",
  component: TaskbarTime,
  argTypes: {
    time: { control: "text", name: "Time string" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16 }}>
    {/* Simuleer taskbar container zodat styling van .time zichtbaar is */}
    <div className="taskbar" style={{ position: "relative", height: 56 }}>
      <TaskbarTime time={args.time} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  time: new Date().toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  }),
};
