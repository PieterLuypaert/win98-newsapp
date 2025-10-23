import "../../../styles/index.css";
import React from "react";
import { NewsNavigation } from "./NewsNavigation";

// replace external data import with a small inline sample
const sampleCategories = [
  { slug: "nieuws", title: "Nieuws" },
  { slug: "tech", title: "Tech" },
  { slug: "wereld", title: "Wereld" },
  { slug: "cultuur", title: "Cultuur" },
];

export default {
  title: "Design/NewsNavigation",
  component: NewsNavigation,
  argTypes: {
    activeCategory: {
      control: { type: "select" },
      options: ["", ...sampleCategories.map((c) => c.slug)],
    },
    showSearch: { control: "boolean" },
    onCategoryClick: { action: "onCategoryClick" },
    onSearch: { action: "onSearch" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 900 }}>
    <NewsNavigation
      categories={sampleCategories}
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
  activeCategory: sampleCategories[0]?.slug || "",
  showSearch: true,
};

export const WithoutSearch = Template.bind({});
WithoutSearch.args = {
  activeCategory: "",
  showSearch: false,
};
