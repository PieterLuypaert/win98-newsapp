import "@styles/index.css";
import React from "react";
import { BookmarkButton } from "./BookmarkButton";

export default {
  title: "Design/BookmarkButton",
  component: BookmarkButton,
  argTypes: {
    isBookmarked: { control: "boolean" },
  },
};

const Template = (args) => (
  <div style={{ width: 240 }}>
    <BookmarkButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isBookmarked: false,
};

export const Bookmarked = Template.bind({});
Bookmarked.args = {
  isBookmarked: true,
};
