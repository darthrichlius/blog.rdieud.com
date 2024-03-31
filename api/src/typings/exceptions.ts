export interface ApiException {
  status: boolean;
  error: errorType;
}

export type errorType = {
  status: number;
  message: string;
  details?: string
};
