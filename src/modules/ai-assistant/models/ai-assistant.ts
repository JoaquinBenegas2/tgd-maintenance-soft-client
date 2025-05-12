export interface AIResponse {
  message: string;
  timestamp: string;
}

export type QueryType = "daily-summary" | "improvement-suggestions";

export interface AIQuery {
  type: QueryType;
  label: string;
}
