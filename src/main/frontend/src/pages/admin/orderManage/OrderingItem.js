import React, { useEffect, useState } from 'react';
import './OrderingItem.css';
import Unauthorized from '../Unauthorized';
import Modal from './OrderingModal';
import axios from 'axios';

const OrderingItem = () => {
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderingList, setOrderingList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [stockCount, setStockCount] = useState({})

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const OrderingCart = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const orderData = {
      totalPrice
    };

    // 주문 생성
    axios.post('/orderItem/goOrder', orderData)
      .then(res => {
        const orderNum = res.data.orderNum; 
        console.log(res.data);

        // 주문 세부 정보 삽입
        const orderDetailPromises = cartItems.map(item => {
          const orderDetailData = {
            orderCnt: item.quantity,
            itemNum: item.itemNum, 
            detailPrice: item.price,
            orderNum: orderNum 
          };

          return axios.post('/orderItem/goOrderDetail', orderDetailData);
        });

        return Promise.all(orderDetailPromises);
      })
      .then(() => {
        alert('주문이 완료되었습니다.');
      })
      .catch(error => {
        console.log(error);
        alert('주문 처리 중 오류가 발생했습니다.');
      });

    closeModal();
  };

  const handleQuantityChange = (itemNum, stock) => (event) => {
    const value = Math.max(1, Math.min(stock, Number(event.target.value)));
    setQuantities((prev) => ({ ...prev, [itemNum]: value }));
  };

  const addToCart = (ordering) => {
    const quantity = quantities[ordering.itemNum] || 1;

    if (window.confirm('구매 목록에 추가하시겠습니까?')) {
      const totalPrice = ordering.price * quantity;

      const existingItem = cartItems.find(item => item.itemNum === ordering.itemNum);
      if (existingItem) {
        setCartItems((prev) =>
          prev.map(item =>
            item.itemNum === ordering.itemNum
              ? { ...item, quantity: item.quantity + quantity, totalPrice: item.totalPrice + totalPrice }
              : item
          )
        );
      } else {
        setCartItems(prev => [
          ...prev,
          {
            itemNum: ordering.itemNum,
            itemName: ordering.itemName,
            supName: ordering.supVO.supName,
            price: ordering.price,
            quantity,
            totalPrice,
          }
        ]);
      }
    }
  };

  useEffect(() => {
    axios.get('/sup/selectOrderingList')
      .then(res => {
        console.log(res.data);
        setOrderingList(res.data);
        res.data.forEach(ordering => {
          onlyStockCount(ordering.supNum, ordering.itemNum);
        });
      })
      .catch((error) => { console.log(error); });
  }, []);
  

  const onlyStockCount = (supNum, itemNum) => {
    axios.get(`/orderItem/onlyStockCnt?supNum=${supNum}&itemNum=${itemNum}`)
      .then(res => {
        setStockCount(prev => ({ ...prev, [itemNum]: res.data }));
      })
      .catch(error => {
        console.log(error);
        alert('재고 수량을 가져오는 데 오류가 발생했습니다.');
      });
  };
  

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
                    <td>
                      <span> 거래처 : </span>
                      <select>
                        <option> 그린카페 의약품 </option>
                      </select>
                    </td>
                    <td>
                    <select>
                        <option> 상품 타입 </option>
                      </select>
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
                  <col width='7%' />
                  <col width='10%' />
                  <col width='*%' />
                  <col width='10%' />
                  <col width='9%' />
                  <col width='9%' />
                  <col width='9%' />
                  <col width='10%' />
                  <col width='6%' />
                </colgroup>
                <thead>
                  <tr>
                    <td>상품 코드</td>
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
                  {orderingList.map((ordering, i) => {
                    const itemType = ordering.itemTypeVO;
                    const sup = ordering.supVO;
                    const quantity = quantities[ordering.itemCode] || 1;
                    const totalPrice = ordering.price * quantity;

                    return (
                      <tr key={i}>
                        <td>{ordering.itemCode}</td>
                        <td>{itemType.typeName}</td>
                        <td>{ordering.itemName}</td>
                        <td>{ordering.stock} 개</td>
                        <td>{(ordering.price).toLocaleString()} 원</td>
                        <td>
                          <input 
                            type='number' 
                            name='orderCnt' 
                            defaultValue={1} 
                            min={1}
                            onChange={handleQuantityChange(ordering.itemNum, ordering.stock)} 
                          /> 개
                        </td>
                        <td>{totalPrice.toLocaleString()} 원</td>
                        <td>{stockCount[ordering.itemNum] ? stockCount[ordering.itemNum] : 'Loading...'} 개</td>

                        <td>
                          <button onClick={() => addToCart(ordering)}>추가</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className='cartButton'>
                <i className="bi bi-cart" onClick={openModal}> 구매목록</i>
              </div>
            </div>
          ) : (
            <Unauthorized />
          )}
        </div>
      ) : (
        <Unauthorized />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={OrderingCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default OrderingItem;
