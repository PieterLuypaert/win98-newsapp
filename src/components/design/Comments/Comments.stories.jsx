import "@styles/index.css";
import React from "react";
import { Comments } from "./Comments";

export default {
  title: "Design/Comments",
  component: Comments,
  argTypes: {
    postId: { control: "number" },
    // losse controls voor twee voorbeeldcomments (makkelijker te bewerken in Storybook)
    comment1Name: { control: "text", name: "Comment 1 — Name" },
    comment1Body: { control: "text", name: "Comment 1 — Body" },
    comment2Name: { control: "text", name: "Comment 2 — Name" },
    comment2Body: { control: "text", name: "Comment 2 — Body" },
    onAdd: { action: "onAdd" },
  },
};

const Template = (args) => {
  // bouw initialComments array vanuit losse controls
  const buildInitialComments = () => {
    const items = [];
    if (args.comment1Name || args.comment1Body) {
      items.push({
        postId: args.postId || 1,
        id: 101,
        name: args.comment1Name || "Jane Doe",
        body:
          args.comment1Body ||
          "Dit is een voorbeeldcommentaar — pas deze tekst aan via de controls.",
      });
    }
    if (args.comment2Name || args.comment2Body) {
      items.push({
        postId: args.postId || 1,
        id: 102,
        name: args.comment2Name || "John Smith",
        body: args.comment2Body || "Nog een voorbeeldcommentaar.",
      });
    }
    return items;
  };

  const initialComments = buildInitialComments();

  return (
    <div style={{ padding: 16, maxWidth: 800 }}>
      <Comments
        postId={args.postId || 1}
        initialComments={initialComments}
        onAdd={args.onAdd}
      />
    </div>
  );
};

export const NoComments = Template.bind({});
NoComments.args = {
  postId: 9999,
  // geen comment-controls ingevuld -> initialComments leeg
  comment1Name: "",
  comment1Body: "",
  comment2Name: "",
  comment2Body: "",
};

export const WithComments = Template.bind({});
WithComments.args = {
  postId: 1,
  comment1Name: "Jane Doe",
  comment1Body:
    "Dit is een voorbeeldcommentaar — pas deze tekst aan via de controls.",
  comment2Name: "John Smith",
  comment2Body: "Nog een voorbeeldcommentaar.",
};
