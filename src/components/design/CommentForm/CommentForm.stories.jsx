import "../../../styles/index.css";
import React from "react";
import { CommentForm } from "./CommentForm";

export default {
  title: "Design/CommentForm",
  component: CommentForm,
  argTypes: {
    initialName: { control: "text" },
    initialBody: { control: "text" },
    onSubmit: { action: "onSubmit" },
    onCancel: { action: "onCancel" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 680 }}>
    <CommentForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
