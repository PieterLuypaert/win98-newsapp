import "../../../styles/index.css";
import React from "react";
import { LoginForm } from "./LoginForm";

export default {
  title: "Design/LoginForm",
  component: LoginForm,
  argTypes: {
    initialEmail: { control: "text", name: "Initial Email" },
    initialPassword: { control: "text", name: "Initial Password" },
    initialRemember: { control: "boolean", name: "Stay logged in" },
    onSubmit: { action: "onSubmit" },
    onRegister: { action: "onRegister" },
  },
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <LoginForm
      initialEmail={args.initialEmail}
      initialPassword={args.initialPassword}
      initialRemember={args.initialRemember}
      onSubmit={args.onSubmit}
      onRegister={args.onRegister}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  initialEmail: "",
  initialPassword: "",
  initialRemember: false,
};
