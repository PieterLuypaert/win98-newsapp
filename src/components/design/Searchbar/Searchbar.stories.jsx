import "../../../styles/index.css";
import React from "react";
import { SearchBar } from "./Searchbar";

export default {
  title: "Design/SearchBar",
  component: SearchBar,
  argTypes: {
    placeholder: { control: "text" },
    onSearch: { action: "onSearch" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, width: 600 }}>
    <SearchBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search news...",
};
