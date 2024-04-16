import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinAdd = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_password: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_profile: null,
  });

  const handleValueChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    setUser((prev) => {
      return { ...prev, user_profile: e.target.files[0] };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_idemail", user.user_idemail);
    formData.append("user_password", user.user_password);
    formData.append("user_name", user.user_name);
    formData.append("user_phonenumber", user.user_phonenumber);
    formData.append("user_nickname", user.user_nickname);
    formData.append("user_profile", user.user_profile);

    await axios
      .post(`/user/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/"); // 회원가입 완료 후 홈페이지로 이동
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="user_idemail"
              placeholder="이메일"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="user_password"
              placeholder="비밀번호"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="user_name"
              placeholder="이름"
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="user_phonenumber"
              placeholder="연락처"
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="user_nickname"
              placeholder="닉네임"
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAdd;
