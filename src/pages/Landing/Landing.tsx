import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const Landing: React.FC<{}> = (props: {}) => {
  const [option, setOption] = useState("");
  if (option == "redpill") {
    return <Navigate to={"/journal"} />;
  } else
    return (
      <h2>
        <span
          title="Be whatever you want 🚀"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            setOption("redpill");
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
