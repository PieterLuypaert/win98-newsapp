import "../../../styles/index.css";
import React from "react";
import { FormEmail } from "./FormEmail";

export default {
  title: "Design/FormEmail",
  component: FormEmail,
  argTypes: {
    placeholder: { control: "text" },
    required: { control: "boolean" },
    className: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <FormEmail {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "jouw@email.com",
  required: true,
  className: "win98-input",
};
