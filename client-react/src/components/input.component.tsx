import React from "react";

import { inputType } from "../types/types";

const InputComponent: React.FC<inputType> = ({
  inType,
  value,
  cb,
  label,
  placeHolder,
  classNames,
}) => {
  return (
    <input
      name={label}
      type={inType}
      placeholder={placeHolder}
      className={`component__input ${classNames}`}
      value={value}
      autoComplete="on"
      onChange={(event) => cb(event)}
    />
  );
};

export default InputComponent;
