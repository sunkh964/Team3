import React, { useEffect, useState } from 'react';
import './OrderItem.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderItem = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems]=useState([]);
  
  // 세션에 있는 로그인 정보 받아오기
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);

  useEffect(()=>{
    axios.get("/orderItem/selectOrderItem")
    .then((res)=>{
      console.log(res.data)
      setOrderItems(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  
  return (
    <div className='orderItemContainer'>
      {loginData && Object.keys(loginData).length > 0 ? (
        <div className='Order-header'>
          {loginData.staffRole === 'DOCTOR' ? (
            <table className='main-table'>
              <colgroup>
                <col width='5%'/>
                <col width='5%'/>
                <col width='15%'/>
                <col width='15%'/>
                <col width='10%'/>
                <col width='10%'/>
                <col width='15%'/>
                <col width='15%'/>
              </colgroup>
              <thead>
                <tr>
                  <td>번호</td>
                  <td>수량</td>
                  <td>용품 타입</td>
                  <td>품명</td>
                  <td>단가</td>
                  <td>금액</td>
                  <td>발주처</td>
                  <td>발주일</td>
                </tr>
              </thead>
              <tbody>
                {
                  orderItems.map((orderItem,i)=>{
                    const productType = orderItem.productTypeVO;
                    const supProduct = orderItem.supProductVO;
                    const sup = orderItem.supVO;

                    return(
                      <tr key={i}>
                        <td> {i+1} </td>
                        <td> {orderItem.quantity} </td>
                        <td> {productType?productType.typeName:null} </td>
                        <td> {supProduct?supProduct.productName:null} </td>
                        <td>{supProduct?supProduct.price:null}</td>
                        <td>
                          {supProduct && supProduct.price && orderItem.quantity 
                            ? supProduct.price * orderItem.quantity 
                            : 0}
                        </td>

                        <td>{sup?sup.supName:null}</td>
                        <td>{orderItem.orderDate}</td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          ) : (
          <div className='non-authority-header'>
            페이지 이용 권한이 없습니다.
          </div>
          )}
        </div>
      ) : (
        <div className='non-authority-header'>
          페이지 이용 권한이 없습니다.
        </div>
      )}
    </div>
  );
};

export default OrderItem;
