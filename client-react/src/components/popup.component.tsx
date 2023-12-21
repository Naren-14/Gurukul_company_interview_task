import React from "react";

import { buttonType } from "../types/types";

const PopUpComponent: React.FC<buttonType> = ({ text, cb, classNames }) => {
  return (
    <section className="popup-container">
      <div className="popup-body">
        <div className="container__inner popup-contentBox">
          <h1>{text}</h1>

          <button
            className={`component__button ${classNames}`}
            onClick={(event) => cb(event)}
          >
            OK
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopUpComponent;
