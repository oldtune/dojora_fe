import React from "react";

export const Landing: React.FC<{}> = (props: {}) => {
  return (
    <h2>
      <span
        title="Be whatever you want 🚀"
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => {
          window.location.pathname = "journal";
        }}
      >
        Red
      </span>{" "}
      pill or{" "}
      <span
        title="Do whatever you want 😉"
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => (window.location.href = "https://google.com/")}
      >
        Blue
      </span>{" "}
      pill?
    </h2>
  );
};
