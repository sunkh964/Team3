import React from 'react';
import './OrderingItem.css';
import Unauthorized from '../Unauthorized';

const OrderingItem = () => {
  // 세션에 있는 로그인 정보 받아오기
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);

  return (
    <div className='orderingItemContainer'>
      {loginData && Object.keys(loginData).length > 0 ? (
        <div>
          {loginData.staffRole === 'ADMIN' ? (
            <div className='orderingControllerDiv'>
              <div>발주 신청</div>
              <table className='orderingFirTable'>
                <thead>
                  <tr>
                    <td> <span> 거래처 : </span>
                      <select>
                        <option> 그린카페 의약품 </option>
                      </select>
                    </td>
                    <td> <span>상품 타입 :</span>
                      <select>
                        <option> 소모품 A </option>
                      </select>
                    </td>
                    <td><span> 상품 번호 : </span>
                      <input type='search' className='searchItemNum' />
                      <button className='orderingBtn'>
                        <i className="bi bi-search"></i>
                      </button>
                    </td>
                  </tr>
                </thead>
              </table>
              <table className='orderingSecTable'>
                <colgroup>
                  <col width='6%'/>
                  <col width='10%'/>
                  <col width='10%'/>
                  <col width='9%'/>
                  <col width='9%'/>
                  <col width='9%'/>
                  <col width='9%'/>
                  <col width='9%'/>
                  <col width='6%'/>
                </colgroup>
                <thead>
                  <tr>
                    <td>상품 번호</td>
                    <td>상품 타입</td>
                    <td>상품 이름</td>
                    <td>거래처 재고량</td>
                    <td>상품 가격</td>
                    <td>구매 수량</td>
                    <td>총 금액</td>
                    <td>본원 재고량</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> 상품 타입 </td>
                    <td> 상품 이름 </td>
                    <td> 1 개 </td>
                    <td> 1 원 </td>
                    <td> <input type='number'/> 개 </td>
                    <td> 1 원 </td>
                    <td> 1 개 </td>
                    <td> <button>추가</button> </td>
                  </tr>
                </tbody>

              </table>
            </div>
          ) : (
            <Unauthorized />
          )}
        </div>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
};

export default OrderingItem;
