import React, { useEffect, useState } from 'react';
import './OrderItem.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Unauthorized from '../Unauthorized';

const OrderItem = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);

  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [orderAmounts, setOrderAmount] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(10);
  const [searchdata, setSearchData] = useState({
    searchType: 'TYPE_NAME',
    searchValue: ''
  });

  useEffect(() => {
    fetchOrderItems();
    fetchTotalOrderAmount();
  }, []);

  const fetchOrderItems = () => {
    axios.post("/orderItem/selectOrderItem", { ...searchdata, currentYear, currentMonth })
      .then((res) => {
        setOrderItems(res.data);
      })
      .catch((error) => { console.log(error); });
  };

  const fetchTotalOrderAmount = () => {
    axios.get('/orderItem/totalOrderAmount', { params: { currentYear, currentMonth } })
      .then((res) => {
        setOrderAmount(res.data);
        const total = res.data.reduce((sum, item) => sum + item.totalAmount, 0);
        setTotalAmount(total);
      })
      .catch((error) => { console.log(error); });
  };

  const changeSearchData = (e) => {
    setSearchData({
      ...searchdata,
      [e.target.name]: e.target.value
    });
  };

  const searchItems = () => {
    fetchOrderItems();
  };

  const selectLastMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = (prevMonth === 1) ? 12 : prevMonth - 1;
      const newYear = (prevMonth === 1) ? currentYear - 1 : currentYear;
      return newMonth;
    });

    const newMonth = (currentMonth === 1) ? 12 : currentMonth - 1;
    const newYear = (currentMonth === 1) ? currentYear - 1 : currentYear;

    axios.post('/orderItem/selectOrderItem', { ...searchdata, currentYear: newYear, currentMonth: newMonth })
      .then((res) => {
        setOrderItems(res.data);
      })
      .catch((error) => console.log(error));

    fetchTotalOrderAmount();
  };

  const selectNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = (prevMonth === 12) ? 1 : prevMonth + 1;
      const newYear = (prevMonth === 12) ? currentYear + 1 : currentYear;
      return newMonth;
    });

    const newMonth = (currentMonth === 12) ? 1 : currentMonth + 1;
    const newYear = (currentMonth === 12) ? currentYear + 1 : currentYear;

    axios.post('/orderItem/selectOrderItem', { ...searchdata, currentYear: newYear, currentMonth: newMonth })
      .then((res) => {
        setOrderItems(res.data);
      })
      .catch((error) => console.log(error));

    fetchTotalOrderAmount();
  };

  const completedDeli = (detailNum) => {
    if (window.confirm('상품을 수령받았습니까?')) {
      axios.put('/orderItem/completedDeli', { detailNum })
        .then((res) => {
          const updatedOrderItems = orderItems.map(orderItem => {
            if (orderItem.orderDetailVO.detailNum === detailNum) {
              return {
                ...orderItem,
                deliverVO: { ...orderItem.deliverVO, deliStatus: '배송완료' }
              };
            }
            return orderItem;
          });
          setOrderItems(updatedOrderItems);
          navigate(0);
        })
        .catch((error) => { console.log(error); });
    }
  };

  const cancelDeli = (orderNum) => {
    if (window.confirm('주문을 취소하시겠습니까?')) {
      axios.put('/orderItem/cancelDeli', { orderNum })
        .then((res) => { navigate(0); })
        .catch((error) => { console.log(error); });
    }
  };

  return (
    <div className='orderItemContainer'>
      {loginData && Object.keys(loginData).length > 0 ? (
        <div className='Order-header'>
          {loginData.staffRole === 'ADMIN' ? (
            <div>
              <div className='table-date'>
                <i
                  className={`bi ${isLeftHovered ? 'bi-caret-left-fill' : 'bi-caret-left'}`}
                  onMouseEnter={() => setIsLeftHovered(true)}
                  onMouseLeave={() => setIsLeftHovered(false)}
                  onClick={selectLastMonth}
                ></i>
                <div className='no-hover'>
                  <i className="bi bi-calendar3"></i>
                  {currentYear}년 {currentMonth}월
                </div>
                <i
                  className={`bi ${isRightHovered ? 'bi-caret-right-fill' : 'bi-caret-right'}`}
                  onMouseEnter={() => setIsRightHovered(true)}
                  onMouseLeave={() => setIsRightHovered(false)}
                  onClick={selectNextMonth}
                ></i>
              </div>
              <div className='search-orderItem'>
                <select name='searchType' value={searchdata.searchType} onChange={changeSearchData}>
                  <option value={'SUP_NAME'}>발주처</option>
                  <option value={'item_NAME'}>품명</option>
                  <option value={'TYPE_NAME'}>용품 타입</option>
                </select>
                <input type='text' onChange={changeSearchData} name='searchValue' />
                <button onClick={searchItems}><i className="bi bi-search"></i></button>
              </div>
              <div className='table-container'>
                <table className='main-table'>
                  <colgroup>
                    <col width='3%' />
                    <col width='4%' />
                    <col width='*%' />
                    <col width='3%' />
                    <col width='7%' />
                    <col width='7%' />
                    <col width='7%' />
                    <col width='8%' />
                    <col width='8%' />
                    <col width='8%' />
                    <col width='7%' />
                    <col width='6%' />
                    <col width='6%' />
                  </colgroup>
                  <thead>
                    <tr>
                      <td>번호</td>
                      <td>타입</td>
                      <td>품명</td>
                      <td>수량</td>
                      <td>단가</td>
                      <td>금액</td>
                      <td>발주처</td>
                      <td>발주일</td>
                      <td>출발일</td>
                      <td>도착일</td>
                      <td>배송 상태</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderItems.map((orderItem, i) => {
                        const itemType = orderItem.itemTypeVO;
                        const item = orderItem.itemVO;
                        const sup = orderItem.supVO;
                        const deliver = orderItem.deliverVO;
                        const detail = orderItem.orderDetailVO;

                        console.log(detail);

                        let deliverStateClass;
                        switch (deliver ? deliver.deliStatus : null) {
                          case '배송중':
                            deliverStateClass = 'delivering';
                            break;
                          case '배송완료':
                            deliverStateClass = 'delivered';
                            break;
                          case '주문취소':
                            deliverStateClass = 'cancelDeliver';
                            break;
                          default:
                            deliverStateClass = 'default';
                            break;
                        }

                        return (
                          detail.map((detailItem, j) => {
                            return (
                              <tr key={j}>
                                <td>{orderItems.length - i}</td>
                                <td>{itemType ? itemType.typeName : null}</td>
                                <td>{detailItem ? detailItem.itemVO.itemName : null}</td>
                                <td>{detailItem.orderCnt}</td>
                                <td>{item ? detailItem.itemVO.price.toLocaleString() : null} 원</td>
                                <td>
                                  {item && item.price && detailItem.orderCnt
                                    ? (detailItem.itemVO.price * detailItem.orderCnt).toLocaleString()
                                    : 0} 원
                                </td>
                                <td>{sup ? sup.supName : null}</td>
                                <td>{orderItem.orderDate}</td>
                                <td>{detailItem.departTime}</td>
                                <td>{detailItem.arriveTime}</td>
                                <td className={deliverStateClass}>{deliver ? deliver.deliStatus : null}</td>
                                <td>
                                  {deliver.deliStatus !== '배송완료' && deliver.deliStatus !== '주문취소' && (
                                    <button className='isDeliver-btn'
                                      onClick={() => { cancelDeli(detailItem.detailNum) }}
                                    > 주문 취소 </button>
                                  )}
                                </td>
                                <td>
                                  {deliver.deliStatus === '배송중' && (
                                    <button className='isDeliver-btn'
                                      onClick={() => { completedDeli(detailItem.detailNum) }}
                                    > 수령 확인 </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>

              <div className='total-amount-div'>
                <table>
                  <thead>
                    <tr>
                      <td colSpan={2}>당월 주문 금액</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderAmounts.map((orderAmount, i) => {
                        return (
                          <tr key={i}>
                            <td>{orderAmount.typeName}</td>
                            <td> - {orderAmount.totalAmount.toLocaleString()} 원</td>
                          </tr>
                        );
                      })
                    }
                    <tr className='cancelAmountTr'>
                      <td colSpan={2}>
                        주문 취소 된 금액
                      </td>
                    </tr>
                    {
                      orderAmounts.map((orderAmount, i) => {
                        return (
                          <tr key={i} className='cancelAmount'>
                            <td>{orderAmount.typeName}</td>
                            <td> + {orderAmount.totalAmount.toLocaleString()} 원</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>총 합계</td>
                      <td>- {totalAmount.toLocaleString()} 원</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
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

export default OrderItem;
