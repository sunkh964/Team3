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
            <div className='orderingTable'>
              <div>발주 관리</div>
              <table>
                <colgroup>
                  <col width='6%'/>
                  <col width='8%'/>
                  <col width='6%'/>
                  <col width='8%'/>
                  <col width='6%'/>
                  <col width='8%'/>
                  <col width='6%'/>
                  <col width='10%'/>
                </colgroup>
                <thead>
                  <tr>
                    <td> 거래처 : </td>
                    <td>
                      <select>
                        <option> 거래처 A </option>
                      </select>
                    </td>
                    <td> 품명 : </td>
                    <td>
                      <select>
                        <option> 품명 A </option>
                      </select>
                    </td>
                    <td> 용품 타입 : </td>
                    <td>
                      <select>
                        <option> 소모품 A </option>
                      </select>
                    </td>
                    <td> 품번 : </td>
                    <td>
                      <input type='search' className='searchItemNum' />
                      <button className='orderingBtn'>
                        <i className="bi bi-search"></i>
                      </button>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>발주 일자 : </td>
                    <td>
                      <input type='date' />
                    </td>
                    <td> 발주담당자 : </td>
                    <td>
                      <select>
                        <option>이순신</option>
                      </select>
                    </td>
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
