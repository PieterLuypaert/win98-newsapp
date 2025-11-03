import "../../../styles/index.css";
import React from "react";
import { FormInput } from "./FormInput";

export default {
  title: "Design/FormInput",
  component: FormInput,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    error: { control: "text" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <FormInput {...args} />
  </div>
);

export const Text = Template.bind({});
Text.args = {
  type: "text",
  name: "username",
  label: "Username:",
  placeholder: "Enter username",
  required: true,
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  name: "email",
  label: "Email:",
  placeholder: "jouw@email.com",
  required: true,
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  name: "password",
  label: "Wachtwoord:",
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  type: "email",
  name: "email",
  label: "Email:",
  value: "invalid-email",
  error: "Please enter a valid email address",
};
