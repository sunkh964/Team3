import React, { useRef } from 'react'
import './ChartModal.css'

// isOpen : 모달에서 보여지는 내용
// onClose : 모달을 닫는 코드
// onConfirm : 모달의 확인버튼 클릭 시 실행할 코드
const ChartModal = ({isOpen, onClose, onConfirm, patieName}) => {
  const modalContainer = useRef();

  if (!isOpen) return null; // 모달이 열리지 않을 때는 아무 것도 렌더링하지 않음

  return (
    <div className="modal-container show" ref={modalContainer}>
      <div className="pay-modal">
        <div className='modal-header'>
          <span onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
        <div className='modal-content'>
          <div className='payPatieName'>
            {patieName}님 수납정보
          </div>
          <table>
            <tbody>
              <tr>
                <td>진료금액</td>
                <td> <input type='text'/> </td>
                <td>결제일자</td>
                <td> <input type='date' defaultValue={new Date().toISOString().split('T')[0]} className='noText'/> </td>
              </tr>
              <tr>
                <td>매출금액</td>
                <td> <input type='text'/> </td>
                <td>카드결제</td>
                <td> <input type='text'/> </td>
              </tr>
              <tr>
                <td>미수금액</td>
                <td> <input type='text'/> </td>
                <td>현금결제</td>
                <td> <input type='text'/> </td>
              </tr>
              <tr>
                <td>선불금</td>
                <td> <input type='text'/> </td>
                <td>통장수납</td>
                <td> <input type='text'/> </td>
              </tr>
              <tr>
                <td>환불</td>
                <td> <input type='text'/> </td>
                <td>환불사유</td>
                <td> <input type='text'/> </td>
              </tr>
            </tbody>
          </table>
            <table>
              <tbody>
                <tr>
                  <td>카드결제금액</td>
                  <td><input type='text'/></td>
                  <td>카드사</td>
                  <td> <select className='noText'>
                      <option>현대 카드</option>
                      <option>삼성 카드</option>
                    </select> </td>
                </tr>
                <tr>
                  <td>현금결제금액</td>
                  <td><input type='text'/></td>
                  <td>할인금액</td>
                  <td><input type='text'/></td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className='modal-footer'>
          <button className='btn btn-primary' onClick={onConfirm}>
            수납완료
          </button>
          <button className='btn' onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartModal