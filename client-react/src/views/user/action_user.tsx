import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { userType, inputEvent, clickEvent } from "../../types/types";
import { fetchOneUser, addUser, updateUser } from "../../store/api/http";
import InputComponent from "../../components/input.component";
import ButtonComponent from "../../components/button.component";
import PopUpComponent from "../../components/popup.component";

function ActionUserPage(): React.ReactElement {
  const [popup, setPopUP] = useState<boolean>(false);
  const [popUpText, setPopUPText] = useState<string>("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState<userType>({
    name: "",
    mobile: "",
    email: "",
  });

  const resetData = () => {
    setUserDetail({
      name: "",
      mobile: "",
      email: "",
    });
  };

  useEffect(() => {
    if (userId) {
      fetchOneUser(userId).then((res) => {
        const user = JSON.parse(localStorage.getItem("userDetail") || "{}");
        setUserDetail({
          name: user?.name,
          mobile: user?.phone,
          email: user?.email,
        });
      });
    }
  }, [userId]);

  const userSubmitHandler = (e: clickEvent) => {
    e.preventDefault();

    if (userId) {
      const data = {
        userId: userId,
        name: userDetail.name,
        phone: userDetail.mobile,
        email: userDetail.email,
      };
      updateUser(data)
        .then((res) => {
          setPopUPText("User Details updated Successfully");

          popUpHandler();
        })
        .catch((err) => {
          console.log("🚀 ~ file: action_user.tsx:55 ~ updateUser ~ err:", err);
        });
    } else {
      const data = {
        name: userDetail.name,
        phone: userDetail.mobile,
        email: userDetail.email,
      };
      addUser(data)
        .then((res) => {
          setPopUPText("User Details saved Successfully");
          popUpHandler();
        })
        .catch((Err) => {
          console.log("🚀 ~ file: action_user.tsx:68 ~ addUser ~ Err:", Err);
        });
    }
  };

  const stateChangeHandler = (event: inputEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "name":
        setUserDetail({ ...userDetail, name: value });
        break;
      case "mobile":
        setUserDetail({ ...userDetail, mobile: value });
        break;
      case "email":
        setUserDetail({ ...userDetail, email: value });
        break;
      default:
        return false;
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
            <h2 className="m-y-block-large">
              {userId ? "Update" : "Add"} User
            </h2>
            <div className="container__auth__content">
              <label>User Name</label>
              <InputComponent
                label="name"
                inType="text"
                value={userDetail.name}
                placeHolder="Please enter your name"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Email Id</label>
              <InputComponent
                label="email"
                inType="text"
                value={userDetail.email}
                placeHolder="Please enter your email"
                cb={stateChangeHandler}
              />
            </div>
            <div className="container__auth__content">
              <label>Mobile Number</label>
              <InputComponent
                label="mobile"
                inType="text"
                value={userDetail.mobile}
                placeHolder="Please enter your mobile number"
                cb={stateChangeHandler}
              />
            </div>
            <div className="m-y-block-large container__action__button">
              <ButtonComponent text="Cancel" cb={resetData} />
              <ButtonComponent text="Save" cb={userSubmitHandler} />
            </div>
          </section>
        </section>
      </main>
    </section>
  );
}

export default ActionUserPage;
