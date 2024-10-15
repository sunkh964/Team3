import React, { useEffect, useState } from 'react';
import './StockItem.css';
import Unauthorized from '../Unauthorized';
import axios from 'axios';

const StockItem = () => {
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);

  const [stockItems, setStockItems] = useState([]);
  const [searchdata, setSearchData] = useState({
    searchType: 'TYPE_NAME',
    searchValue: ''
  });
  const [editableIndex, setEditableIndex] = useState(null); // 수정 가능한 인덱스 상태
  const [safetyCount, setSafetyCount] = useState({}); // 안전 재고량 상태

  function changeSearchData(e) {
    setSearchData({
      ...searchdata,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    axios.post('/orderItem/selectStockItem', searchdata)
      .then(res => {
        console.log(res.data);
        setStockItems(res.data);
      });
  }, [searchdata]);

  // 각 아이템에 대한 기본 안전 재고량
  const safetyCountMap = {
    '상품 A': 100,
    '상품 B': 150,
    '상품 C': 200,
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setSafetyCount({
      ...safetyCount,
      [index]: stockItems[index].stockItemCnt < safetyCountMap[stockItems[index].itemVO.itemName] ? safetyCountMap[stockItems[index].itemVO.itemName] : stockItems[index].stockItemCnt,
    });
  };

  const handleComplete = (index) => {
    const updatedItems = [...stockItems];
    updatedItems[index].safetyCount = safetyCount[index];
    setStockItems(updatedItems);
    setEditableIndex(null); // 수정 모드 종료
  };

  return (
    <div className='orderingItemContainer'>
      {loginData && Object.keys(loginData).length > 0 ? (
        <div>
          {loginData.staffRole === 'ADMIN' ? (
            <div className='stockItemContainer'>
              <div>재고 관리</div>

              <table>
                <colgroup>
                  <col width='6%' />
                  <col width='18%' />
                  <col width='10%' />
                  <col width='15%' />
                  <col width='12%' />
                  <col width='*' />
                  <col width='6%' />
                </colgroup>
                <thead>
                  <tr>
                    <td>용품 타입</td>
                    <td>품명</td>
                    <td>총 재고량</td>
                    <td>거래처</td>
                    <td>총 안전 재고량</td>
                    <td>비고</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {stockItems.map((stockItem, i) => {
                    const itemType = stockItem.itemTypeVO;
                    const item = stockItem.itemVO;
                    const sup = stockItem.supVO;
                    const safetyCnt = safetyCount[i] !== undefined ? safetyCount[i] : safetyCountMap[item.itemName] || 200; // 기본값 설정

                    return (
                      <tr key={i}>
                        <td>{itemType.typeName}</td>
                        <td>{item.itemName}</td>
                        <td><input type='number' readOnly value={stockItem.stockItemCnt} /></td>
                        <td>{sup.supName}</td>
                        <td>
                          <input
                            type='number'
                            readOnly={editableIndex !== i}
                            value={safetyCnt}
                            onChange={(e) => setSafetyCount({ ...safetyCount, [i]: e.target.value })}
                          />
                        </td>
                        <td>
                          {stockItem.stockItemCnt < safetyCnt && (
                            <span style={{ color: 'red' }}>재고량이 안전 재고량보다 적습니다.</span>
                          )}
                        </td>
                        <td>
                          {editableIndex === i ? (
                            <button onClick={() => handleComplete(i)}>완료</button> 
                          ) : (
                            <button onClick={() => handleEdit(i)}>수정</button> 
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className='addStockDiv'><button className='addStock'>재고 추가</button></div>
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
}

export default StockItem;
