import "@styles/index.css";
import React from "react";
import { FormCheckbox } from "./FormCheckbox";

export default {
  title: "Design/FormCheckbox",
  component: FormCheckbox,
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    className: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <FormCheckbox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Akkoord met voorwaarden",
  required: true,
  className: "",
};
