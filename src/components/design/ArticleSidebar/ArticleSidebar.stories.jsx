import "../../../styles/index.css";
import React from "react";
import { ArticleSidebar } from "./ArticleSidebar";

export default {
  title: "Design/ArticleSidebar",
  component: ArticleSidebar,
  argTypes: {
    // author fields
    firstName: { control: "text" },
    lastName: { control: "text" },
    bio: { control: "text" },
    avatar: { control: "text" },
    twitter: { control: "text" },
    linkedin: { control: "text" },

    // sidebar props
    articleId: { control: "number" },
    scrollProgress: { control: { type: "number", min: 0, max: 100, step: 1 } },
  },
};

const Template = (args) => {
  const author = {
    id: 1,
    firstName: args.firstName ?? "Pieter",
    lastName: args.lastName ?? "Luypaert",
    bio:
      args.bio ??
      "Frontend developer and Windows nostalgia enthusiast. Loves retro UIs.",
    avatar: args.avatar ?? "/assets/avatar-default.png",
    social: {
      twitter: args.twitter || "",
      linkedin: args.linkedin || "",
    },
  };

  return (
    <div style={{ padding: 16, maxWidth: 360 }}>
      <ArticleSidebar
        author={author}
        articleId={args.articleId ?? 42}
        scrollProgress={args.scrollProgress ?? 0}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  firstName: "Pieter",
  lastName: "Luypaert",
  bio: "Frontend developer and Windows nostalgia enthusiast.",
  avatar: "/assets/avatar-default.png",
  twitter: "https://twitter.com/example",
  linkedin: "https://www.linkedin.com/in/example",
  articleId: 42,
  scrollProgress: 25,
};

export const FullProgress = Template.bind({});
FullProgress.args = {
  ...Default.args,
  scrollProgress: 100,
};
