import React from "react";
import { useState } from "react";

import { radioType } from "../types/types";

const RadioComponent: React.FC<radioType> = ({
  text,
  cb,
  classNames,
  check,
}) => {
  return (
    <section
      aria-label="radio_btn"
      className="component__radio pointer"
      id={text}
      onClick={(event) => cb(event)}
    >
      {check === text && <button className="pointer"></button>}
    </section>
  );
};

export default RadioComponent;
