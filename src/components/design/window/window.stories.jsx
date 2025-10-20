import "../../../styles/index.css";
import React from "react";
import { Window } from "./window";

export default {
  title: "Design/Window",
  component: Window,
  argTypes: {
    title: { control: "text" },
    width: { control: { type: "number", min: 200, max: 1600, step: 50 } },
    height: { control: { type: "number", min: 100, max: 1200, step: 50 } },
    onClose: { action: "onClose" },
  },
};

const Template = (args) => (
  <div style={{ width: "100%", height: "100vh", background: "transparent" }}>
    <Window {...args}>
      <div style={{ padding: 16 }}>
        <h3>Storybook Window Content</h3>
        <p>
          Dit is voorbeeldinhoud voor de Window-story. Pas width/height/title
          aan via de controls.
        </p>
      </div>
    </Window>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Demo Window",
  width: 900,
  height: 600,
};

export const Small = Template.bind({});
Small.args = {
  title: "Small Window",
  width: 480,
  height: 320,
};
