import "../../../styles/index.css";
import React from "react";
import { FormGender } from "./FormGender";

export default {
  title: "Design/FormGender",
  component: FormGender,
  argTypes: {
    required: { control: "boolean" },
    className: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <FormGender {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  required: true,
  className: "win98-input",
};
