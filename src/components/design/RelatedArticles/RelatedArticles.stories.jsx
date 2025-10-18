import "../../../styles/index.css";
import React from "react";
import { RelatedArticles } from "./RelatedArticles";

export default {
  title: "Design/RelatedArticles",
  component: RelatedArticles,
  argTypes: {
    articles: { control: "object" },
    onArticleClick: { action: "onArticleClick" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <RelatedArticles {...args} />
  </div>
);

const sampleItems = [
  {
    id: 11,
    slug: "example-related-1",
    title: "Related: Example Headline 1",
    timestamp: new Date().toISOString(),
    mainImage: "/assets/article-sample.jpg",
  },
  {
    id: 12,
    slug: "example-related-2",
    title: "Related: Example Story 2",
    timestamp: new Date().toISOString(),
    mainImage: "/assets/article-sample-2.jpg",
  },
  {
    id: 13,
    slug: "example-related-3",
    title: "Related: Example Insight 3",
    timestamp: new Date().toISOString(),
    mainImage: "/assets/article-sample-3.jpg",
  },
];

export const Default = Template.bind({});
Default.args = {
  articles: sampleItems,
};

