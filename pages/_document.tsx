import dotenv from "dotenv";
import { Html, Head, Main, NextScript } from "next/document";

dotenv.config();

export default function Document() {
  return (
    <Html>
      <Head />
      <body id="app">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
