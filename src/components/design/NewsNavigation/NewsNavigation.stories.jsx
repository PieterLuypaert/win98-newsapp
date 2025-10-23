import "../../../styles/index.css";
import React from "react";
import { NewsNavigation } from "./NewsNavigation";
import categoriesData from "../../../data/categories.json";

export default {
  title: "Design/NewsNavigation",
  component: NewsNavigation,
  argTypes: {
    activeCategory: {
      control: { type: "select" },
      options: ["", ...categoriesData.map((c) => c.slug)],
    },
    showSearch: { control: "boolean" },
    onCategoryClick: { action: "onCategoryClick" },
    onSearch: { action: "onSearch" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 900 }}>
    <NewsNavigation
      categories={categoriesData} 
      activeCategory={args.activeCategory || null}
      onCategoryClick={args.onCategoryClick}
      onSearch={args.showSearch ? args.onSearch : undefined}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  activeCategory: "",
  showSearch: true,
};

export const CategoryActive = Template.bind({});
CategoryActive.args = {
  activeCategory: categoriesData[0]?.slug || "",
  showSearch: true,
};

export const WithoutSearch = Template.bind({});
WithoutSearch.args = {
  activeCategory: "",
  showSearch: false,
};
