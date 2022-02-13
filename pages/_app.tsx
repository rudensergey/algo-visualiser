import "../src/app.css";

import "@templates/Main/Main.styles.css";
import "@templates/Graph/Graph.styles.css";
import "@templates/Sort/Sort.styles.css";

import "@shared/Dropdown/Dropdown.styles.css";
import "@shared/Bar/Bar.styles.css";
import "@shared/Button/Button.styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
