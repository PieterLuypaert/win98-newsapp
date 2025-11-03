import "@styles/index.css";
import React from "react";
import { AuthorCard } from "./AuthorCard";

export default {
  title: "Design/AuthorCard",
  component: AuthorCard,
  argTypes: {
    firstName: { control: "text" },
    lastName: { control: "text" },
    bio: { control: "text" },
    avatar: { control: "text" },
    twitter: { control: "text" },
    linkedin: { control: "text" },
  },
};

const Template = (args) => {
  const author = {
    firstName: args.firstName,
    lastName: args.lastName,
    bio: args.bio,
    avatar: args.avatar,
    social: {
      twitter: args.twitter || "",
      linkedin: args.linkedin || "",
    },
  };

  return (
    <div style={{ padding: 16, maxWidth: 360 }}>
      <AuthorCard author={author} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  firstName: "Pieter",
  lastName: "Luypaert",
  bio: "Frontend developer and Windows nostalgia enthusiast. Loves building retro-inspired UIs and readable news apps.",
  avatar: "/assets/avatar-default.png",
  twitter: "https://twitter.com/example",
  linkedin: "https://www.linkedin.com/in/example",
};

export const NoSocial = Template.bind({});
NoSocial.args = {
  firstName: "Alex",
  lastName: "Example",
  bio: "Guest author without social links.",
  avatar: "/assets/avatar-default.png",
  twitter: "",
  linkedin: "",
};
