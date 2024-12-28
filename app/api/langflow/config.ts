export const LANGFLOW_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_LANGFLOW_BASE_URL,
  APPLICATION_TOKEN: process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN,
  FLOW_ID: process.env.NEXT_PUBLIC_LANGFLOW_FLOW_ID,
  LANGFLOW_ID: process.env.NEXT_PUBLIC_LANGFLOW_ID,
} as const;

// Type assertion to ensure all values are strings and not undefined
export type LangflowConfig = typeof LANGFLOW_CONFIG;
