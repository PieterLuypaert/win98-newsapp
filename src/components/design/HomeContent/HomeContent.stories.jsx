import "../../../styles/index.css";
import React from "react";
import { MemoryRouter } from "react-router";
import { HomeContent } from "./HomeContent";

export default {
  title: "Design/HomeContent",
  component: HomeContent,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <div style={{ padding: 16, height: "80vh", background: "transparent" }}>
      <HomeContent {...args} />
    </div>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
