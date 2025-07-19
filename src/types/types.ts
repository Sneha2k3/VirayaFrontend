export interface AuthResponse {
  jwt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}