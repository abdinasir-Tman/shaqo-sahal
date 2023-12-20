export const API =
  process.env.NODE_ENV === "production"
    ? "yourdomain.com/api"
    : "http://localhost:3000/api";
