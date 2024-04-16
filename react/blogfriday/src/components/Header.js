import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handlelogoClick = () => {
    navigate("/");
  };
  const search = (product_name) => {
    navigate(`/search/${product_name}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    search(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleImgClick = () => {
    navigate("/seller/product/list");
  };

  const naviChat = () => {
    navigate("/chat/home");
  };

  return (
    <div className="header">
      <div className="header-box">
        <div className="blank0"></div>
        <a href="/">
          <div className="logo" onClick={handlelogoClick} />
        </a>
        <div className="blank1"></div>
        <div className="topmid">
          <input
            type="text"
            className="search-input"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearchClick}>
            검색
          </button>
        </div>
        <div className="blank2"></div>
        <button className="myPage" onClick={naviChat}>
          채팅
        </button>
        <button className="productsave" onClick={handleImgClick}>
          판매관리
        </button>
        <div className="blank3"></div>
      </div>
    </div>
  );
};

export default Header;
