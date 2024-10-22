import React, { useRef } from 'react';
import '../orderManage/OrderingModal.css';

const OrderingModal = ({ isOpen, onClose, onConfirm, cartItems }) => {
  const modalContainer = useRef();
  if (!isOpen) return null;

  const totalCartPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0); // 총 금액 계산

  return (
    <div className='modalContainerShow show' ref={modalContainer}>
      <div className='ordering-Modal'>
        <div className='modal-header'>
          <span onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
        <h2> 구매 목록 </h2>
        <div className='cartList'>
          <table>
            <colgroup>
              <col width='4%' />
              <col width='8%' />
              <col width='8%' />
              <col width='6%' />
              <col width='5%' />
              <col width='6%' />
              <col width='5%' />
              <col width='5%' />
            </colgroup>
            <thead>
              <tr>
                <td>번호</td>
                <td>품명</td>
                <td>거래처</td>
                <td>가격</td>
                <td>수량</td>
                <td>총 금액</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.itemCode}>
                  <td>{index + 1}</td>
                  <td>{item.itemCode}</td>
                  <td className='rightText'>{item.itemName}</td>
                  <td>{item.price.toLocaleString()} 원</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice.toLocaleString()} 원</td>
                  <td><button>수정</button></td>
                  <td><button>삭제</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='modalTotalPrice'>
          총 금액 : {totalCartPrice.toLocaleString()} 원
        </div>
        <div className='modalBottmBtn'>
          <button onClick={onConfirm}>구매하기</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default OrderingModal;
