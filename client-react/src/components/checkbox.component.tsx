import React from "react";

import { checkboxType } from "../types/types";

const CheckboxComponent: React.FC<checkboxType> = ({
  text,
  cb,
  classNames,
  check,
}) => {
  return (
    <section
      aria-label="check_box"
      id={text}
      className={`component__checkbox  pointer ${classNames}`}
      onClick={cb}
    >
      {check === text && <img src="/assets/icons/tickIcon.svg" alt="tick" />}
    </section>
  );
};

export default CheckboxComponent;
