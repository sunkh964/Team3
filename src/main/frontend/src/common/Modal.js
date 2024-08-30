import React, { useRef } from 'react'
import "./Modal.css"

// content : 모달에서 보여지는 내용
// setIsShow : 모달을 닫는 코드
// clickCloseBtn : 모달의 확인버튼 클릭 시 실행할 코드
const Modal = ({content, footerContent, setIsShow, clickCloseBtn, setModifyActive}) => {
   const modalContainer = useRef();
   return (
      <div className='modal-container show' ref={modalContainer}>
         <div className='modal'>
         <div className='modal-header'>
            <span onClick={() => {
               modalContainer.current.className = 'modal-container';
               setTimeout(() => {
                  setIsShow(false)
                  setModifyActive(false)
               }, 200);
            }}>
               <i className="bi bi-x-lg" />
            </span>
         </div>
         <div className='modal-content'>
            {
               content()
            }
         </div>
         <div className='modal-footer'>
            {
               footerContent()
            }
            <button type='button'
               onClick={() => {
                  modalContainer.current.className = 'modal-container';
                  setTimeout(() => {
                     //모달창 닫기
                     setIsShow(false)
                     //어떤 페이지에서 모달창을 실행했냐에 따라 실행 코드가 달라져야 함
                     clickCloseBtn();
                  }, 200);
               }}>확인</button>
         </div>
         </div>
      </div>
   )
}

export default Modal