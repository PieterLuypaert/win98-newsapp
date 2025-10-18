import "../../../styles/index.css";
import React, { useState } from "react";
import { Textarea } from "./Textarea";

export default {
  title: "Design/Textarea",
  component: Textarea,
  argTypes: {
    rows: { control: { type: "number", min: 1, max: 20, step: 1 } },
    placeholder: { control: "text" },
    className: { control: "text" },
    onChange: { action: "onChange" },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value ?? "");
  const handleChange = (e) => {
    setValue(e.target.value);
    if (args.onChange) args.onChange(e);
  };

  return (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <Textarea {...args} value={value} onChange={handleChange} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  rows: 5,
  placeholder: "Write your comment here...",
  className: "",
  value: "",
};

export const Filled = Template.bind({});
Filled.args = {
  ...Default.args,
  value: "Voorbeeldtekst in het tekstveld om de styling te tonen.",
};
