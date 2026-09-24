export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_SERVER_FOLDER: string;  
        REACT_APP_AUTH_URL: string;
        REACT_APP_API_URL: string;
        REACT_APP_DEBUG: string;
        REACT_APP_ReCAPTCHA_SITE_KEY: string;
        REACT_APP_ReCAPTCHA_SECRET_KEY: string
    }
  }
}
