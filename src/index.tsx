import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home/Home";
import { AboutPage } from "./pages/About/About";
import { NotFound } from "./pages/NotFound/NotFound";
import { NewChallengePage } from "./pages/NewChallenge/NewChallenge";
import { MePage } from "./pages/Me/Me";
import { FeatureSuggestionPage } from "./pages/FeatureSuggestion/FeatureSuggestion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "new",
        element: <NewChallengePage />,
      },
      {
        path: "me",
        element: <MePage />,
      },
      { path: "suggest-feature", element: <FeatureSuggestionPage /> },
    ],
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
