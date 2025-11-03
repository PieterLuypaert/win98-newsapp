import "../../../styles/index.css";
import React from "react";
import { FormRadio } from "./FormRadio";

export default {
  title: "Design/FormRadio",
  component: FormRadio,
};

const Template = (args) => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <FormRadio {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: "gender",
  label: "Geslacht:",
  options: [
    { value: "male", label: "Man" },
    { value: "female", label: "Vrouw" },
    { value: "other", label: "Anders" },
  ],
};

export const WithError = Template.bind({});
WithError.args = {
  name: "subscription",
  label: "Subscription:",
  options: [
    { value: "free", label: "Free" },
    { value: "premium", label: "Premium" },
    { value: "enterprise", label: "Enterprise" },
  ],
  error: "Please select a subscription type",
};
