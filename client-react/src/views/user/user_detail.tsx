import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneUser } from "../../store/api/http";
import { userDetailType } from "../../types/types";

function UserDetailsPage(): React.ReactElement {
  const [userDetail, setUserDetail] = useState<userDetailType>();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      fetchOneUser(userId).then((res) => {
        const user = JSON.parse(localStorage.getItem("userDetail") || "{}");
        setUserDetail(user);
      });
    }
  }, [userId]);
  return (
    <section className="container__outer">
      <section className="container__inner">
        <header className="m-y-block-large">
          <h1>User Details</h1>
        </header>
        <main>
          <h2 className="m-y-small">{userDetail?.name}</h2>
          <h2 className="m-y-small">{userDetail?.email}</h2>
          <h2 className="m-y-small">{userDetail?.phone}</h2>
        </main>
      </section>
    </section>
  );
}

export default UserDetailsPage;
