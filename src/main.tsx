/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-body: 16px;
    --font-size-title: 20px;
    --font-size-normal: 24px;
    --font-size-large: 32px;

    --color-text: white;
    --color-button: #049ed0;
    --color-background: #42607a;
    --color-dark: #1a2632;
    --color-overlay: rgba(0, 0, 0, 0.7);

    --font-family: sans-serif;

    --content-max-width: 940px;
    --sidebar-width: 480px;
    --border-radius: 6px;

    --logo-size-small: 32px;
    --logo-size-large: 120px;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: var(--font-family);
    font-size: var(--font-size-body);
    font-weight: 400;
    color: var(--color-text);
    background-color: var(--color-background);
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
