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

  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const [orderAmounts, setOrderAmount] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(()=>{
    axios.post("/orderItem/selectOrderItem", searchdata)
    .then((res)=>{
      console.log(res.data)
      setOrderItems(res.data)
    })
    .catch((error)=>{console.log(error)})

    axios.get('/orderItem/totalOrderAmount')
    .then((res)=>{
      console.log(res.data)
      setOrderAmount(res.data)
      const total = res.data.reduce((sum,item)=> sum+item.TOTAL_AMOUNT, 0)
      setTotalAmount(total)

    })
    .catch((error)=>{console.log(error)})

  },[])
  
  const [searchdata, setSearchData]=useState({
    searchType: 'TYPE_NAME',
    searchValue: ''
  })

  // 검색 내용 값 변경
  function changeSearchData(e){
    setSearchData({
      ...searchdata,
      [e.target.name]:e.target.value
    })
  }

  // 검색 버튼
  function searchItems(){
    axios.post('/orderItem/selectOrderItem', searchdata)
    .then((res)=>{
      console.log(res.data)
      setOrderItems(res.data)
    })
    .catch((error)=>{console.log(error)})
  }

  return (
    <div className='orderItemContainer'>
      {loginData && Object.keys(loginData).length > 0 ? (
        <div className='Order-header'>
          {loginData.staffRole == 'DOCTOR' ? (

            <div>
              <div className='table-date'>
                <i 
                  className={`bi ${isLeftHovered ? 'bi-caret-left-fill' : 'bi-caret-left'}`} 
                  onMouseEnter={() => setIsLeftHovered(true)} 
                  onMouseLeave={() => setIsLeftHovered(false)} 
                ></i>
                <div className='no-hover'>
                  <i className="bi bi-calendar3"></i>
                  2024년 09월
                </div>
                <i 
                  className={`bi ${isRightHovered ? 'bi-caret-right-fill' : 'bi-caret-right'}`} 
                  onMouseEnter={() => setIsRightHovered(true)} 
                  onMouseLeave={() => setIsRightHovered(false)} 
                ></i>
              </div>
              <div className='search-orderItem'>
                <select name='searchType' onChange={changeSearchData}>
                  <option value={'TYPE_NAME'}>용품 타입</option>
                  <option value={'PRODUCT_NAME'}>품명</option>
                  <option value={'SUP_NAME'}>발주처</option>
                </select>
                <input type='text' onChange={changeSearchData} name='searchValue'/>
                <button onClick={searchItems}>검색</button>
              </div>
              <div className='table-container'>
                <table className='main-table'>
                  <colgroup>
                    <col width='5%'/>
                    <col width='5%'/>
                    <col width='10%'/>
                    <col width='15%'/>
                    <col width='8%'/>
                    <col width='10%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='10%'/>
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
                      <td>배송 상태</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderItems.map((orderItem,i)=>{
                        const productType = orderItem.productTypeVO;
                        const supProduct = orderItem.supProductVO;
                        const sup = orderItem.supVO;

                        let deliverStateClass;
                        switch (orderItem.deliverState) {
                          case '배송중':
                            deliverStateClass = 'delivering';
                            break;
                          case '배송완료':
                            deliverStateClass = 'delivered';
                            break;
                          default:
                            deliverStateClass = 'default';
                            break;
                        }
                        
                        return(
                          <tr key={i}>
                            <td>{orderItems.length - i}</td>
                            <td>{orderItem.quantity}</td>
                            <td>{productType ? productType.typeName : null}</td>
                            <td>{supProduct ? supProduct.productName : null}</td>
                            <td>{supProduct ? supProduct.price : null}</td>
                            <td>
                              {supProduct && supProduct.price && orderItem.quantity
                                ? supProduct.price * orderItem.quantity
                                : 0}
                            </td>
                            <td>{sup ? sup.supName : null}</td>
                            <td>{orderItem.orderDate}</td>
                            <td className={deliverStateClass}>{orderItem.deliverState}</td>
                            <td>
                              {orderItem.deliverState == '배송중' &&(
                                <button className='isDeliver-btn' > 수령 확인 </button>
                              ) }
                              </td>
                          </tr>
                        )
                      })
                    }
                    
                  </tbody>
                </table>
              </div>

              <div>
                <table>
                  <thead>
                    <tr>
                      <th>용품 타입</th>
                      <th>총 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderAmounts.map((orderAmount, i) => (
                      <tr key={i}>
                        <td>{orderAmount.typeName}</td>
                        <td>{orderAmount.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>총 합계</td>
                      <td>{totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>



            </div>
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
