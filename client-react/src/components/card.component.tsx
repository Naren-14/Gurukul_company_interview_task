import React from "react";

import { cartDataType } from "../types/types";

const CartComponent: React.FC<cartDataType> = ({
  id,
  name,
  phone,
  cb,
  email,
  classNames,
}) => {
  return (
    <section
      id="cart-container"
      className={`component__card d-flex caret-none ${classNames}`}
      onClick={(e) => cb(e, "cart-container", id)}
    >
      <main className="component__card__contentBox">
        <section className="component__card__textBox">
          <div className="component__card__textBox__label-container">
            <label>{name}</label>
          </div>
          <div className="component__card__textBox__label-container">
            <label>{email}</label>
          </div>
          <div className="component__card__textBox__label-container">
            <label>{phone}</label>
          </div>
        </section>
        <div className="component__card__imageBox">
          <img
            id="delete-icon"
            src="/assets/icons/deleteIcon.svg"
            alt="delete-icon"
            onClick={(e) => cb(e, "delete-icon", id)}
          />
          <img
            id="edit-icon"
            src="/assets/icons/editIcon.svg"
            alt="edit-icon"
            onClick={(e) => cb(e, "edit-icon", id)}
          />
        </div>
      </main>
    </section>
  );
};

export default CartComponent;
