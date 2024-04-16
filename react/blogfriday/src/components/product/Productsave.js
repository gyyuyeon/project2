import { useNavigate, useParams } from "react-router-dom";
import "./Productsave.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";

const Porductsave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    category_code: "",
    product_name: "",
    product_price: "",
    product_count: "",
    product_content_text: "",
    filename: null,
  });

  const user_id = 1;
  const {
    category_code,
    product_name,
    product_price,
    product_count,
    product_content_text,
    filename,
  } = product;

  // const [img, setImg] = useState({
  //   product_img0: "",
  // });

  // const { product_img0 } = img;

  const productDetail = useSelector((state) => state.product.productDetail);

  const handleValueChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const savemenunavi = (e) => {};

  const listmenunavi = (e) => {
    navigate("/seller/product/list");
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };
  const [secondFile, setSecondFile] = useState(null);
  const handleSecondFileChange = (e) => {
    setSecondFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("category_code", category_code);
    formData.append("product_name", product_name);
    formData.append("product_price", product_price);
    formData.append("product_count", product_count);
    formData.append("product_content_text", product_content_text);

    if (filename != null) formData.append("filename", filename);
    if (secondFile != null) formData.append("secondFile", secondFile);
    console.log("filename", filename);
    //확인
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log("두번째 파일 로그", secondFile);
    try {
      await dispatch(productActions.getProductWrite(formData));
      alert("action 전송 성공.");
    } catch (error) {
      console.error("action 전송 실패", error);
    }

    setProduct({
      user_id: "",
      category_code: "",
      product_name: "",
      product_price: "",
      product_count: "",
      product_content_text: "",
      filename: null,
    });
  };

  return (
    <>
      <div className="head"></div>
      <div className="seller_body">
        <div className="seller_menu_box">
          <div className="seller_menu_button" onClick={listmenunavi}>
            물품 리스트
          </div>
          <div className="seller_menu_button" onClick={savemenunavi}>
            물품 등록
          </div>
          <div className="seller_menu_button">정산</div>
        </div>
        <form className="save" onSubmit={onSubmit}>
          <table>
            <tbody>
              <tr>
                <th>user_id</th>
                <td>
                  <div>{user_id}</div>
                </td>
              </tr>
              <tr>
                <th>category_code</th>
                <td>
                  <input
                    type="text"
                    name="category_code"
                    onChange={handleValueChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>product_name</th>
                <td>
                  <input
                    type="text"
                    name="product_name"
                    onChange={handleValueChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>product_price</th>
                <td>
                  <input
                    type="text"
                    name="product_price"
                    onChange={handleValueChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>product_count</th>
                <td>
                  <input
                    type="text"
                    name="product_count"
                    onChange={handleValueChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>product_text</th>
                <td>
                  <input
                    type="text"
                    name="product_content_text"
                    onChange={handleValueChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <th width="20%" align="center">
                  메인 이미지
                </th>
                <td>
                  <input
                    type="file"
                    name="filename"
                    id="filepath"
                    onChange={handleFileChange}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    name="secondFile"
                    onChange={handleSecondFileChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary">
            등록완료
          </button>
        </form>
      </div>
    </>
  );
};

export default Porductsave;
