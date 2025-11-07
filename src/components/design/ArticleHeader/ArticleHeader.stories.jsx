import "@styles/index.css";
import React from "react";
import { ArticleHeader } from "./ArticleHeader";

export default {
  title: "Design/ArticleHeader",
  component: ArticleHeader,
  argTypes: {
    title: { control: "text" },
    timestamp: { control: "date" },
    intro: { control: "text" },
    mainImage: { control: "text" },
    categories: { control: "object" },
  },
};

const Template = (args) => {
  const article = {
    title: args.title ?? "Voorbeeldartikel titel",
    timestamp:
      typeof args.timestamp === "number"
        ? new Date(args.timestamp).toISOString()
        : args.timestamp ?? new Date().toISOString(),
    intro:
      args.intro ??
      "Dit is een korte introductie van het artikel. Pas deze tekst aan via de controls.",
      mainImage: "/public/assets/news-application.png",
    categories:
      Array.isArray(args.categories) && args.categories.length > 0
        ? args.categories
        : [
            { slug: "nieuws", title: "Nieuws" },
            { slug: "tech", title: "Tech" },
          ],
  };

  return (
    <div style={{ padding: 16, maxWidth: 900 }}>
      <ArticleHeader article={article} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Voorbeeldartikel: Storybook ArticleHeader",
  timestamp: new Date().toISOString(),
  intro:
    "Introductie tekst die in Storybook aangepast kan worden om te zien hoe de header zich gedraagt.",
  mainImage: "/assets/article-sample.jpg",
  categories: [
    { slug: "tech", title: "Tech" },
    { slug: "wereld", title: "Wereld" },
  ],
};

export const NoImage = Template.bind({});
NoImage.args = {
  ...Default.args,
  mainImage: "",
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  ...Default.args,
  title:
    "Een zeer lange voorbeeldtitel die laat zien hoe de header zich gedraagt bij lange titels en meerdere regels",
};
