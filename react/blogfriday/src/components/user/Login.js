import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    user_idemail: "",
    user_password: "",
  });

  const { user_idemail, user_password } = inputs;

  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/user/login", inputs)
      .then((response) => {
        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        localStorage.setItem("Authorization", accessToken);
        localStorage.setItem("Authorization-refresh", refreshToken);
        localStorage.setItem("user_idemail", response.data.user_idemail);
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("isLogin", true);

        setInputs({ user_idemail: "", user_password: "" });
        window.location.replace("/page");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container text-center mt-5">
      <div className="mx-5">
        <h1>로그인</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group mt-1">
            <input
              type="email"
              name="user_idemail"
              className="form-control"
              id="user_idemail"
              value={user_idemail}
              placeholder="이메일"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mt-1">
            <input
              type="password"
              className="form-control"
              name="user_password"
              id="user_password"
              value={user_password}
              placeholder="비밀번호"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="mt-1">
            <button type="submit" className="btn btn-primary">
              로그인
            </button>
            <Link className="btn btn-primary" to="/joinadd">
              회원 가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
