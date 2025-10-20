import "../../../styles/index.css";
import React from "react";
import { FormName } from "./FormName";

export default {
  title: "Design/FormName",
  component: FormName,
  argTypes: {
    firstPlaceholder: { control: "text", name: "First placeholder" },
    lastPlaceholder: { control: "text", name: "Last placeholder" },
    required: { control: "boolean" },
    className: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 520 }}>
    <FormName {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  firstPlaceholder: "Voornaam",
  lastPlaceholder: "Achternaam",
  required: true,
  className: "win98-input",
};
