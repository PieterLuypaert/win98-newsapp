import "../../../styles/index.css";
import React from "react";
import { ArticleCard } from "./ArticleCard";

export default {
  title: "Design/ArticleCard",
  component: ArticleCard,
  argTypes: {
    onClick: { action: "onClick" },
    onCategoryClick: { action: "onCategoryClick" },

    id: { control: "number" },
    slug: { control: "text" },
    title: { control: "text" },
    intro: { control: "text" },
    mainImage: { control: "text" },
    timestamp: { control: "date" },
    categories: { control: "object" },
    tags: { control: "object" },
    isHeadline: { control: "boolean" },
  },
};

const Template = (args) => {
  const article = {
    id: args.id ?? 1,
    slug: args.slug ?? "example-article",
    title: args.title ?? "Example Article Title",
    intro:
      args.intro ??
      "This is an example intro for the article card. Use the controls to change content.",
    timestamp:
      typeof args.timestamp === "number"
        ? new Date(args.timestamp).toISOString()
        : args.timestamp ?? new Date().toISOString(),
    mainImage: args.mainImage ?? "/assets/article-sample.jpg",
    categories:
      Array.isArray(args.categories) && args.categories.length > 0
        ? args.categories
        : [
            { slug: "tech", title: "Tech" },
            { slug: "world", title: "World" },
          ],
    tags:
      Array.isArray(args.tags) && args.tags.length > 0
        ? args.tags
        : [{ slug: "sample", title: "Sample" }],
    isHeadline: !!args.isHeadline,
  };

  return (
    <div style={{ padding: 16, maxWidth: 800 }}>
      <ArticleCard
        article={article}
        isHeadline={args.isHeadline}
        onClick={args.onClick}
        onCategoryClick={args.onCategoryClick}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 1,
  slug: "example-article",
  title: "Example Article Title",
  intro:
    "This is an example intro for the article card. Use the controls to change content.",
  timestamp: new Date().toISOString(),
  mainImage: "/assets/article-sample.jpg",
  categories: [
    { slug: "tech", title: "Tech" },
    { slug: "world", title: "World" },
  ],
  tags: [{ slug: "sample", title: "Sample" }],
  isHeadline: false,
};

export const Headline = Template.bind({});
Headline.args = {
  ...Default.args,
  isHeadline: true,
};

export const NoCategories = Template.bind({});
NoCategories.args = {
  ...Default.args,
  categories: [],
};
