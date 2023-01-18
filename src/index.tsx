import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/Landing/Landing";
import { WriteJournal } from "./pages/WriteJournal/WriteJournal";
import { NotFound } from "./pages/NotFound/NotFound";
import { Login } from "./Components/User/Login/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/journal/:journalId",
    element: <WriteJournal />,
    errorElement: <NotFound />,
  },
  {
    path: "/journal",
    element: <WriteJournal />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Landing />,
    // errorElement: <NotFound />,
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
