import React, { useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

enum Pill {
  RedPill,
  BluePill,
  None,
}

type canvasConfig = {
  height: number;
  width: number;
};

export const Landing: React.FC<{}> = (props: {}) => {
  const [pill, setPill] = useState(Pill.None);
  const [rendered, setRendered] = useState(false);
  const [canvasConfig, setCanvasConfig] = useState<canvasConfig>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasConfig.width, canvasConfig.height).parent(
      canvasParentRef
    );

    p5.background(255);

    setRendered(true);
  };

  const draw = (p5: p5Types) => {
    p5.text("hello", 500, 500, 600, 600);
  };

  return <Sketch draw={draw} setup={setup} />;
};
