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

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

export default preview;
