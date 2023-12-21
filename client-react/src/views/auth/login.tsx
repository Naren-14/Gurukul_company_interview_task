import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// importing types
import { loginType, inputEvent } from "../../types/types";
// importing api
import { login } from "../../store/api/http";

// importing components
import PopUpComponent from "../../components/popup.component";
import InputComponent from "../../components/input.component";
import ButtonComponent from "../../components/button.component";

function LoginPage(): React.ReactElement {
  const navigate = useNavigate();
  const [popup, setPopUP] = useState<boolean>(false);
  const [popUpText, setPopUPText] = useState<string>("");
  const [loginData, setLoginData] = useState<loginType>({
    email: "",
    password: "",
  });

  const stateChangeHandler = (event: inputEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "email") {
      setLoginData({ ...loginData, email: value });
    } else {
      setLoginData({ ...loginData, password: value });
    }
  };

  const loginSubmitHandler = () => {
    if (loginData.email !== "" || loginData.password !== "") {
      login(loginData)
        .then((res: any) => {
          localStorage.setItem("admin-id", res?.data?.admin._id);
          setPopUPText("User Sucessfully Logged In");
          setPopUP(!popup);
        })
        .catch((Err) => {
          console.log(
            "🚀 ~ file: login.tsx:42 ~ loginSubmitHandler ~ Err:",
            Err
          );
        });
    }
  };

  const popUpHandler = () => {
    setPopUP(!popup);
    navigate("/");
  };
  return (
    <section className="container__outer d-flex m-auto">
      {popup && <PopUpComponent cb={popUpHandler} text={popUpText} />}
      <main className="container__inner">
        <section className="container__auth d-flex">
          <section className="container__inner">
            <h2 className="m-y-block-large">Login</h2>
            <div className="container__auth__content">
              <label>Email Id</label>
              <InputComponent
                label="email"
                inType="text"
                value={loginData.email}
                placeHolder="Please enter your email"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Password</label>
              <InputComponent
                label="password"
                inType="password"
                value={loginData.password}
                placeHolder="Please enter your password"
                cb={stateChangeHandler}
              />
            </div>
            <div className="m-y-block-large container__auth__button">
              <ButtonComponent text="Login" cb={loginSubmitHandler} />
            </div>
            <div className="container__auth__link">
              <p>Don't have an account?</p> <Link to="/sign-up"> Sign up </Link>
            </div>
          </section>
        </section>
      </main>
    </section>
  );
}

export default LoginPage;
