import "../../../styles/index.css";
import React from "react";
import { MemoryRouter } from "react-router";
import { TrendingList } from "./TrendingList";

export default {
  title: "Design/TrendingList",
  component: TrendingList,
  argTypes: {
    items: { control: "object" },
    onArticleClick: { action: "onArticleClick" },
  },
};

const Template = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <div style={{ padding: 16, maxWidth: 320 }}>
      <TrendingList {...args} />
    </div>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      articleId: 1,
      slug: "breaking-news-1",
      title: "Breaking: Example Headline 1",
      views: 1245,
    },
    {
      articleId: 2,
      slug: "insight-2",
      title: "Insight: Example Article 2",
      views: 980,
    },
    {
      articleId: 3,
      slug: "feature-3",
      title: "Feature: Example Story 3",
      views: 760,
    },
    {
      articleId: 4,
      slug: "update-4",
      title: "Update: Example Article 4",
      views: 500,
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  items: [],
};
