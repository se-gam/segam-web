export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};
