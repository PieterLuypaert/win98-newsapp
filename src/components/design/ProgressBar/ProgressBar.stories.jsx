import "@styles/index.css";
import React from "react";
import { ProgressBar } from "./ProgressBar";

export default {
  title: "Design/ProgressBar",
  component: ProgressBar,
  argTypes: {
    progress: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 640 }}>
    <ProgressBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  progress: 35,
};

export const AlmostComplete = Template.bind({});
AlmostComplete.args = {
  progress: 92,
};

export const Complete = Template.bind({});
Complete.args = {
  progress: 100,
};
