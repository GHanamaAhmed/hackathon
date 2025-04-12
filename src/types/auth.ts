export type AuthData = {
  expirationDate: string; // ISO 8601 date string
  token: string; // JWT token string
  userId: number;
  uuid: string; // UUID string
  idIndividu: number;
  etablissementId: number;
  userName: string; // Possibly a number-like string (ID)
};

export type AuthError = {
  error: string;
  details?: any; // Can be refined if you know the structure
};
