import "../../../styles/index.css";
import React from "react";
import { MemoryRouter } from "react-router";
import { RelatedArticles } from "./RelatedArticles";

export default {
  title: "Design/RelatedArticles",
  component: RelatedArticles,
  argTypes: {
    articles: { control: "object" },
  },
};

const Template = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <div style={{ padding: 16, maxWidth: 420 }}>
      <RelatedArticles {...args} />
    </div>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  articles: [
    {
      id: 101,
      slug: "breaking-example-1",
      title: "Breaking: Example Headline 1",
      mainImage: "/public/assets/news-application.png",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: 102,
      slug: "insight-example-2",
      title: "Insight: Example Article 2",
      mainImage: "/public/assets/news-application.png",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
    },
    {
      id: 103,
      slug: "feature-example-3",
      title: "Feature: Example Story 3",
      mainImage: "/public/assets/news-application.png",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30,
    },
  ],
};