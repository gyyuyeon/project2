import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../toolkit/actions/paymentActions";
import { createOrder } from "../../toolkit/actions/orderActions";
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../toolkit/actions/product_action";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product_code } = useParams(); //상품코드 받아오기
  console.log("order++", product_code);

  const [orderInfo, setOrderInfo] = useState({
    deliveryAddress: "",
    deliveryInstruction: "",
    quantity: 1,
  });
  const [product, setProduct] = useState({
    product_name: "차은우 옷갈아입히기 세트",
    product_price: 9990000,
  });

  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentResult, setPaymentResult] = useState("");

  const handleInputChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setOrderInfo({ ...orderInfo, quantity: parseInt(e.target.value) });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitOrder = () => {
    const orderData = {
      deliveryAddress: orderInfo.deliveryAddress,
      deliveryInstruction: orderInfo.deliveryInstruction,
      quantity: orderInfo.quantity,
      totalAmount: product.product_price * orderInfo.quantity,
      orderDate: new Date(), // 현재 시간을 주문 시간으로 설정
      orderAmount: product.product_price * orderInfo.quantity, // 총 주문 금액 계산
    };

    const paymentData = {
      paymentMethod: paymentMethod,
      amount: product.product_price * orderInfo.quantity,
    };

    dispatch(createOrder(orderData))
      .then(() => {
        dispatch(createPayment(paymentData))
          .then(() => {
            setPaymentResult("결제가 성공적으로 완료되었습니다.");
            // 결제 완료 후 주문 완료 페이지로 이동
            navigate("/order/complete");
            // navigate("/order/complete/${}");
          })
          .catch(() => {
            setPaymentResult("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
          });
      })
      .catch(() => {
        setPaymentResult(
          "주문 생성 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      });
  };

  useEffect(() => {
    console.log("+++++++++", product_code);

    // 특정 파라미터 값(예: product_code)을 콘솔에 출력합니다.

    dispatch(productActions.getProductDetail(product_code));
    dispatch(productActions.getProductimgDownload(product_code));
  }, []);
  const imagePath = `/shopimg/${productImgDetail.product_img0}`;
  return (
    <div>
      <div className="order-form">
        <h2>주문 및 결제</h2>
        <input
          type="text"
          name="deliveryAddress"
          placeholder="배송지"
          value={orderInfo.deliveryAddress}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="deliveryInstruction"
          placeholder="배송 요청사항"
          value={orderInfo.deliveryInstruction}
          onChange={handleInputChange}
        />
        <div className="product-info">
          <h3>상품 정보</h3>
          <p>제품명: {productDetail.product_name}</p>
          <img src={imagePath} alt="product_img0" width="300" height="300" />
          <p>가격: {productDetail.product_price}원</p>
          <label>
            수량 선택:
            <input
              type="number"
              name="quantity"
              value={orderInfo.quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <p>
            총 결제 금액: {productDetail.product_price * orderInfo.quantity}원
          </p>
        </div>
        <div className="payment-method">
          <h3>결제 수단 선택</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
            />
            신용카드
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              checked={paymentMethod === "bankTransfer"}
              onChange={handlePaymentMethodChange}
            />
            계좌이체
          </label>
        </div>
        <button onClick={submitOrder} disabled={!paymentMethod}>
          주문하기
        </button>
      </div>
      {paymentResult && <p>{paymentResult}</p>}
    </div>
  );
};

export default PaymentPage;
