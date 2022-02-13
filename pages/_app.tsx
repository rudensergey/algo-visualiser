import "../src/app.css";

import "@templates/Main/Main.styles.css";
import "@templates/Graph/Graph.styles.css";
import "@shared/Dropdown/Dropdown.styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
