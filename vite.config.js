import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      API_KEY:
        "patZmnuZtJf82bpeI.108a2da7319114b069db6d15a5d9bdc29e770b060771c41721ea7da43e0e1395",
      URL_ID: "appXf7xGo2rUA4bSe",
      URL_ID_TWO: "app8eic3faKETBKLc",
    },
  },
});
