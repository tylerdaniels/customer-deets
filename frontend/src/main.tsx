import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import all compiled SCSS
import "./scss/styles.scss";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
