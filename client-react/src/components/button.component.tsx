import React from "react";

import { buttonType } from "../types/types";

const ButtonComponent: React.FC<buttonType> = ({ text, cb, classNames }) => {
  return (
    <button
      className={`component__button ${classNames}`}
      onClick={(event) => cb(event)}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
