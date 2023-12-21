import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// importing testing regular expression
import {
  alphaNumberic,
  onlyNumber,
  onlyLetters,
} from "../../regularExpression/index";
// importing types
import {
  inputEvent,
  mouseEvent,
  signupType,
  clickEvent,
} from "../../types/types";
// importing components
import PopUpComponent from "../../components/popup.component";
import RadioComponent from "../../components/radio.component";
import InputComponent from "../../components/input.component";
import ButtonComponent from "../../components/button.component";
import CheckboxComponent from "../../components/checkbox.component";
import SelectComponent from "../../components/select.component";
// importing api
import { signUp } from "../../store/api/http";
// importing static data
import {
  genderData,
  knowUsDetail,
  citiesData,
  statesData,
} from "../../store/static_data";

function SignUpPage(): React.ReactElement {
  const navigate = useNavigate();
  const [popup, setPopUP] = useState<boolean>(false);
  const [popUpText, setPopUPText] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [signInData, setSignInData] = useState<signupType>({
    email: "",
    password: "",
    name: "",
    phone: "",
    gender: "",
    social_website: "",
    city: "",
    state: "",
  });

  const signInSubmitHandler = (event: clickEvent) => {
    event.preventDefault();

    const isEmpty = Object.values(signInData).some(
      (x) => x === null || x === ""
    );
    if (isEmpty) {
      alert("Please Fill All fields");
    } else {
      if (
        signInData.password.toLocaleLowerCase() !==
        confirmPwd.toLocaleLowerCase()
      ) {
        alert("Enter the correct password");
      } else {
        signUp(signInData)
          .then((res) => {
            console.log("🚀 ~ file: sign_up.tsx:61 ~ signUp ~ res:", res);
            setPopUPText("User Sucessfully Signed UP");
            setPopUP(!popup);
          })
          .catch((err) => {
            console.log("🚀 ~ file: sign_up.tsx:63 ~ signUp ~ err:", err);
            return {};
          });
      }
    }
  };

  const stateChangeHandler = (event: inputEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "name":
        if (onlyLetters.test(value)) {
          setSignInData({ ...signInData, name: value });
        }
        break;
      case "password":
        setSignInData({ ...signInData, password: value });
        break;
      case "phone":
        if (onlyNumber.test(value)) {
          setSignInData({ ...signInData, phone: +value });
        } else {
          return false;
        }
        break;
      case "email":
        if (alphaNumberic.test(value)) {
          setSignInData({ ...signInData, email: value });
        }
        break;
      case "confirm_password":
        setConfirmPwd(value);
        break;
    }
  };

  const selectHandler = (event: clickEvent, label: string) => {
    event.stopPropagation();
    const target = event.target as Element;
    const value = target.id;
    if (label === "city") {
      setSignInData({ ...signInData, city: value });
    } else {
      setSignInData({ ...signInData, state: value });
    }
  };
  const popUpHandler = () => {
    setPopUP(!popup);
    navigate("/login");
  };
  const mouseEventHandler = (event: clickEvent) => {
    const target = event.target as Element;
    const name = target.ariaLabel;
    const value = target.id;

    if (name === "check_box") {
      setSignInData({ ...signInData, social_website: value });
    } else {
      setSignInData({ ...signInData, gender: value });
    }
  };

  let radioRenderindList;

  radioRenderindList = genderData.map((data, ind) => {
    return (
      <div
        key={ind}
        className="container__auth__content d-flex ali-items-center"
      >
        <RadioComponent
          cb={mouseEventHandler}
          text={data}
          check={signInData.gender}
        />
        ;<label className="m-right-small">{data}</label>
      </div>
    );
  });

  let checkRenderingList;
  checkRenderingList = knowUsDetail.map((data, ind) => {
    return (
      <div
        key={ind}
        className="container__auth__content d-flex ali-items-center"
      >
        <CheckboxComponent
          cb={mouseEventHandler}
          text={data}
          check={signInData.social_website}
        />
        ;<label className="m-right-small">{data}</label>
      </div>
    );
  });
  return (
    <section className="container__outer d-flex">
      {popup && <PopUpComponent cb={popUpHandler} text={popUpText} />}
      <form className="container__inner ">
        <section className="container__auth d-flex m-x-block-large">
          <section className="container__inner">
            <h2 className="m-y-block-large">Sign Up</h2>
            <div className="container__auth__content">
              <label>Name</label>
              <InputComponent
                label="name"
                inType="text"
                value={signInData.name}
                placeHolder="Please enter your name"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Email Id</label>
              <InputComponent
                label="email"
                inType="text"
                value={signInData.email}
                placeHolder="Please enter your email"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Phone Number</label>
              <InputComponent
                label="phone"
                inType="text"
                value={signInData.phone}
                placeHolder="Please enter your phone"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content caret-none">
              <label>Gender</label>
              <div className="d-flex">{radioRenderindList}</div>
            </div>
            <div className="container__auth__content caret-none">
              <label>How you know us?</label>
              <div className="d-flex">{checkRenderingList}</div>
            </div>
            <div className="container__auth__content caret-none">
              <label>City</label>
              <SelectComponent
                text={signInData.city}
                options={citiesData}
                cb={selectHandler}
                label="city"
              />
            </div>
            <div className="container__auth__content caret-none">
              <label>States</label>
              <SelectComponent
                text={signInData.state}
                options={statesData}
                label="state"
                cb={selectHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Password</label>
              <InputComponent
                label="password"
                inType="password"
                value={signInData.password}
                placeHolder="Please enter your password"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Confirm Password</label>
              <InputComponent
                label="confirm_password"
                inType="password"
                value={confirmPwd}
                placeHolder="Please enter your password"
                cb={stateChangeHandler}
              />
            </div>
            <div className="m-y-block-large container__auth__button">
              <ButtonComponent text="Sign Up" cb={signInSubmitHandler} />
            </div>
          </section>
        </section>
      </form>
    </section>
  );
}

export default SignUpPage;
