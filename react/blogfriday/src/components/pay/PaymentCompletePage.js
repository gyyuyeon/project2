import React from "react";
import { useSelector } from "react-redux";

const PaymentCompletePage = () => {
  const order = useSelector((state) => state.order.order);

  return (
    <div>
      <h2>결제가 완료되었습니다.</h2>
      {/* 결제 완료 메시지 및 주문 정보 표시 */}
      <p>주문 번호: {order?.orderId}</p>
      <p>주문 금액: {order?.orderAmount}</p>
      {/* 기타 주문 정보 */}
    </div>
  );
};

export default PaymentCompletePage;
