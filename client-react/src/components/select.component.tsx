import React, { ReactEventHandler } from "react";
import { useState, useEffect, useRef } from "react";

import { mouseEvent, selectBoxType } from "../types/types";

const SelectComponent: React.FC<selectBoxType> = ({
  text,
  cb,
  classNames,
  label,
  options,
}) => {
  const [drop, setDrop] = useState<boolean>(false);
  const divEl = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (divEl.current && !divEl.current.contains(event.target)) {
        setDrop(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  let renderingImage = (
    <img src="./assets/icons/arrowDownIcon.svg" alt="downArrow" />
  );
  if (drop) {
    renderingImage = <img src="./assets/icons/arrowupIcon.svg" alt="upArrow" />;
  }
  let renderingList;
  renderingList = options.map((option, ind) => {
    return (
      <li key={ind} id={option} onClick={(event) => cb(event, label)}>
        {option}
      </li>
    );
  });

  const closeDropBox = () => {
    setDrop(false);
  };

  useEffect(() => {
    closeDropBox();
  }, [cb]);
  return (
    <section
      ref={divEl}
      aria-label="select-box"
      className="component__selectBox pointer m-y-small caret-none"
    >
      <header onClick={() => setDrop(!drop)}>
        <p>{text === "" ? `Select your ${label}` : text}</p>
        {renderingImage}
      </header>
      {drop && <ul id="select-drop-content">{renderingList}</ul>}
    </section>
  );
};

export default SelectComponent;
