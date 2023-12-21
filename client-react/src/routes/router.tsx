import React from "react";
import { Route, Routes } from "react-router-dom";

import UserListPage from "../views/user/user_list";
import UserDetailsPage from "../views/user/user_detail";
import ActionUserPage from "../views/user/action_user";
import SignUpPage from "../views/auth/sign_up";
import LoginPage from "../views/auth/login";

function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user-detail/:userId" element={<UserDetailsPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/user/add" element={<ActionUserPage />} />
      <Route path="/user/edit/:userId" element={<ActionUserPage />} />
    </Routes>
  );
}

export default RouterPage;
