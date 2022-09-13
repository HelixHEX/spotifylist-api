declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    API_URL: string;
    CLIENT_URL: string;
    SESSION_SECRET: string;
    STATE_KEY: string;
  }
}
