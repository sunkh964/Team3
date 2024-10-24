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
  const [editableIndex, setEditableIndex] = useState(null);

  const [inputClasses, setInputClasses] = useState({}); 

  // 검색 내용 값 변경
  function changeSearchData(e) {
    setSearchData({
      ...searchdata,
      [e.target.name]: e.target.value
    });
  }

  // 검색 버튼
  function searchItems(){
    axios.post('/orderItem/selectStockItem', searchdata)
    .then((res)=>{
      console.log(res.data)
      setSearchData(res.data)
    })
    .catch((error)=>{console.log(error)})
  }

  // 재고 목록 불러오기
  useEffect(() => {
    axios.post('/orderItem/selectStockItem', searchdata)
      .then(res => {
        setStockItems(res.data);
      });
  }, [searchdata]);

  // 변경된 총 안전 재고량
  const [safetyCount, setSafetyCount] = useState({});

  // 상품 품명별 총 안전 재고량 기본 설정
  const safetyCountMap = {
    '상품 A': 100,
    '상품 B': 150,
    '상품 C': 200,
  };

  function changeSafetyCnt(e){
    setSafetyCount({
      ...safetyCount,
      [e.target.name]:e.target.value
    })
  }

  const handleEdit = (index) => {
    setEditableIndex(index);
    setSafetyCount({
      ...safetyCount,
      [index]: stockItems[index].stockItemCnt < safetyCountMap[stockItems[index].itemVO.itemName] ? safetyCountMap[stockItems[index].itemVO.itemName] : stockItems[index].stockItemCnt,
    });
    setInputClasses(prev => ({ ...prev, [index]: 'editable' })); // 클래스 변경
  };

  const handleComplete = (index) => {
    const updatedItems = [...stockItems];
    updatedItems[index].safetyCount = safetyCount[index];
    setStockItems(updatedItems);
    setEditableIndex(null);
    setInputClasses(prev => ({ ...prev, [index]: '' })); // 클래스 원래대로
  };


  return (
    <div className='orderingItemContainer'>
      {loginData && Object.keys(loginData).length > 0 ? (
        <div>
          {loginData.staffRole === 'ADMIN' ? (
            <div className='stockItemContainer'>
              <div className='stockSearch'>
                <select name='searchType' value={searchdata.searchType} onChange={changeSearchData}>
                  <option value={'SUP_NAME'}>발주처</option>
                  <option value={'item_NAME'}>품명</option>
                  <option value={'TYPE_NAME'}>용품 타입</option>
                </select>
                <input type='text' onChange={changeSearchData} name='searchValue'/>
                <button onClick={searchItems}><i class="bi bi-search"></i></button>
              </div>

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
                    const safetyCnt = safetyCount[i] !== undefined ? safetyCount[i] : safetyCountMap[item.itemName] || 200;

                    return (
                      <tr key={i}>
                        <td>{itemType.typeName}</td>
                        <td>{item.itemName}</td>
                        <td>
                          <input 
                            type='number' 
                            readOnly
                            value={stockItem.stockItemCnt} 
                            />
                        </td>
                        <td>{sup.supName}</td>
                        <td>
                          <input
                            type='number'
                            className={editableIndex === i ? 'changeInput' : ''} 
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
