import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// use React.createElement to avoid JSX in a .js file
export const decorators = [
  (Story) =>
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(Story)
    ),
];

export default preview;
