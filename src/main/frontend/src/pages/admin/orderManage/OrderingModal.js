import React, { useRef } from 'react'
import '../orderManage/OrderingModal.css'

// isOpen : 모달에서 보여지는 내용
// onClose : 모달을 닫는 코드
// onConfirm : 모달의 확인버튼 클릭시 실행할 코드
const OrderingModal = ({isOpen, onClose, onConfirm}) => {

  const modalContainer = useRef();
  if(!isOpen) return null;

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
              <col width='4%'/>
              <col width='8%'/>
              <col width='8%'/>
              <col width='6%'/>
              <col width='5%'/>
              <col width='6%'/>
              <col width='5%'/>
              <col width='5%'/>
            </colgroup>
            <thead>
              <tr>
                <td>번호</td>
                <td>품명</td>
                <td>거래처</td>
                <td>가격</td>
                <td>구매수량</td>
                <td>총 금액</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className='rightText'>1</td>
                <td className='rightText'>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td> <button>수정</button> </td>
                <td> <button>삭제</button> </td>
              </tr>
            </tbody>
          </table>
  
        </div>
        <div className='modalTotalPrice'>
          총 금액 :
        </div>
        <div className='modalBottmBtn'>
          <button onClick={onConfirm}>구매하기</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default OrderingModal