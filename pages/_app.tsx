import React from "react";

// global
import "../src/app.css";

// templates
import "@templates/Main/Main.styles.css";
import "@templates/Graph/Graph.styles.css";
import "@templates/Sort/Sort.styles.css";
import "@templates/Auth/Auth.styles.css";

// shared
import "@shared/Notification/Notification.styles.css";
import "@shared/Input/Input.styles.css";
import "@shared/SortCounter/SortCounter.styles.css";
import "@shared/Menu/Menu.styles.css";
import "@shared/Dropdown/Dropdown.styles.css";
import "@shared/Error/Error.styles.css";
import "@shared/Vertex/Vertex.styles.css";
import "@shared/Bar/Bar.styles.css";
import "@shared/Button/Button.styles.css";
import "@shared/VisualBox/VisualBox.styles.css";

// components
import Notification from "@shared/Notification";

// This default export is required in a new `pages/_app.js` file.

export default function MyApp({ Component, pageProps }) {
  return (
    <Notification>
      <Component {...pageProps} />
    </Notification>
  );
}
