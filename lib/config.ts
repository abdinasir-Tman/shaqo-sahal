export const API =
  process.env.NODE_ENV == "production"
    ? "shaqo-sahal.vercel.app/"
    : "http://localhost:3000/";
