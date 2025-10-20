import "../../../styles/index.css";
import React from "react";
import { FormPassword } from "./FormPassword";

export default {
  title: "Design/FormPassword",
  component: FormPassword,
  argTypes: {
    placeholder: { control: "text" },
    required: { control: "boolean" },
    className: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <FormPassword {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "",
  required: true,
  className: "win98-input",
};
