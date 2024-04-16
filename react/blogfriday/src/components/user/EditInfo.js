import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditInfo = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_password: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
  });

  const {
    user_idemail,
    user_password,
    user_name,
    user_phonenumber,
    user_nickname,
  } = user;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const handleValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChang = (e) => {
    if (user_password !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  const info = async () => {
    await axios
      .get(`/user/${localStorage.user_idemail}`, config)
      .then((response) => {
        setUser((prev) => {
          return { ...prev, ...response.data, user_password: "" };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    info();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user_password) {
      alert("비밀번호를 입력하세요.");
      return;
    }
    try {
      await axios.put(`/user/update`, user, config);
      localStorage.setItem("user_name", user_name);
      // 수정이 성공했을 때 로그아웃하고 로그인 페이지로 이동
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
    }
  };

  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원정보</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="user_idemail"
              placeholder="이메일"
              value={localStorage.user_idemail}
              readOnly
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="user_password"
              placeholder="비밀번호"
              value={user_password}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="user_password2"
              placeholder="비밀번호 확인"
              onChange={passChang}
            />
            <span>{passwordCheck}</span>
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="user_name"
              placeholder="이름"
              value={user_name}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="user_phonenumber"
              placeholder="연락처"
              value={user_phonenumber}
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="user_nickname"
              placeholder="userNickname"
              value={user_nickname}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <label htmlFor="profileImage">프로필 사진</label>
            <input
              type="file"
              className="form-control"
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            회원정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
