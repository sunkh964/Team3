import React, { useEffect, useState } from 'react';
import './Chart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chart = () => {
  const navigate = useNavigate();

  // 대기 환자 담을 배열
  const [recPatieList, setRecWaitPatieList] = useState([]);
  // 진료 환자 담을 배열
  const [recIngPatieList, setRecIngPatieList] = useState([]);

  // 대기 예약 환자 리스트
  useEffect(() => {
    axios.all([axios.get('/rec/selectWaitPatie'), axios.get('/rec/selectIngPatie')])
      .then(
        axios.spread((res1, res2) => {
          setRecWaitPatieList(res1.data);
          setRecIngPatieList(res2.data);
        })
      )
      .catch((error) => { console.log(error); });

    setInterval(() => {
      axios.all([axios.get('/rec/selectWaitPatie'), axios.get('/rec/selectIngPatie')])
      .then(
        axios.spread((res1, res2) => {
          setRecWaitPatieList(res1.data);
          setRecIngPatieList(res2.data);
        })
      )
      .catch((error) => { console.log(error); });

    }, 5000);

  
  }, []);
    

  // 진료환자 등록 버튼
  const goIsNow = async (recNum) => {
    if (window.confirm('진료 환자로 변경하시겠습니까?')) {
      try {
        await axios.put('/rec/updateStatus', { recNum });
        setRecWaitPatieList(prevList => prevList.filter(patie => patie.recNum !== recNum));
        const updatedRecIngPatieList = await axios.get('/rec/selectIngPatie');
        setRecIngPatieList(updatedRecIngPatieList.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('변경이 취소되었습니다.');
    }
  };

  // 환자 집보내기
  const delIsNow = async (recNum) => {
    if (window.confirm('진료가 완료되었습니까?')) {
      try {
        await axios.put('/rec/endStatus', { recNum });
        setRecIngPatieList(prevList => prevList.filter(patie => patie.recNum !== recNum));
        const updatedRecWaitPatieList = await axios.get('/rec/selectWaitPatie');
        setRecWaitPatieList(updatedRecWaitPatieList.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('취소되었습니다.');
    }
  };

  // 검색 환자 넣을 배열
  const [searchPaties, setSearchPaties] = useState([]);
  // 검색 객체
  const [searchData, setSearchData] = useState({
    searchType: 'PATIE_NAME',
    searchValue: ''
  });

  // 검색 내용 값 변경
  const changeSearchData = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const searchPatie = async () => {
    try {
      const res = await axios.post('/patie/searchPaties', searchData);
      setSearchPaties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 대기환자 삭제
  function delRec(recNum){
    if (window.confirm('환자 차트를 삭제하겠습니까?')) {
      axios.delete(`/rec/delRec/${recNum}`)
      .then((res)=>{navigate(0)})
    } 
    else {
      alert('취소되었습니다.');
    }
  }

  return (
    <div className='chart'>
      <div className='title'>당일 환자 차트</div>
      <div className='mainChart'>
        <div className='chartLeft'>
          <div className='todayReg'>
            <div className='todayTop'>
              <p>대기 환자</p>
              <button onClick={() => navigate('/admin/addChart')}>첫 방문 환자 진료 추가</button>
            </div>

            <div className='topContent'>
              {recPatieList.map((recPatie, i) => {
                const patie = recPatie.patieVO;
                const part = recPatie.staffVO.part
                return(
                <div className='todayRegContent' key={i}>
                  <div className='divF'>
                    <div className='clickDetail' onClick={() => navigate(`/admin/history/${patie.patieNum}`)}>이름 : {patie?patie.patieName:null}</div>
                    <div>생년월일 : {patie?patie.patieBirth:null}</div>
                    <div>성별: {patie?patie.patieGen:null}</div>
                  </div>
                  <div className='divFSec'>
                    <div>접수시간 : {recPatie.recDate}</div>
                    <div>진료 부서 : {part?part.partName:null}</div>
                    <div>
                      <span onClick={() => navigate(`/admin/reviseChart/${recPatie.patieNum}/${recPatie.recNum}`)}>수정</span>
                      <span onClick={() => delRec(recPatie.recNum)}>삭제</span>
                      <button onClick={() => goIsNow(recPatie.recNum)}>진료 환자 등록</button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          <div className='searchMem'>
            <div className='searchTitle'>
              <span>재방문 환자 검색</span>
              <div className='search'>
                <input type='text' name='searchValue' onChange={changeSearchData} />
                <button onClick={searchPatie}>검색</button>
              </div>
            </div>
            <div className='searchContent'>
              <div className='searchResultContent'>
                {searchPaties.map((patie, i) => {
                  return(
                  <div className='searchResult' key={i}>
                    <div>
                      <span className='clickDetail' onClick={() => navigate(`/admin/history/${patie.patieNum}`)}>이름 : {patie.patieName}</span>
                      <span>생년월일 : {patie.patieBirth}</span>
                    </div>
                    <div>
                      <span>연락처 : {patie.patieTel}</span>
                      <span>성별 : {patie.patieGen}</span>
                    </div>
                    <div className='put'><button onClick={()=>{navigate(`/admin/insertRec/${patie.patieNum}`)}}>진료추가</button></div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>

        <div className='medTreat'>
          <div className='medTop'><p>진료 환자</p></div>
          <div className='trContent'>
            {recIngPatieList.map((recPatie, i) => {
              const patie = recPatie.patieVO;
              const staff = recPatie.staffVO;
              return(
              <div className='treatContent' key={i}>
                <div className='divTrF'>
                  <div>예약번호 : {recPatie.recNum}</div>
                </div>
                <div className='divTrF'>
                  <div className='clickDetail' onClick={() => navigate(`/admin/history/${recPatie.patieNum}`)}>이름 : {patie.patieName}</div>
                  <div>생년월일 : {patie.patieBirth}</div>
                  <div>성별: {patie?patie.patieGen:null}</div>
                </div>
                <div className='divTrT'>
                  <div>진료 부서 : {staff?staff.part.partName:null} </div>
                  <div>담당의 : {staff.staffName} </div>
                </div>

                <div className='botBut'>
                  <button onClick={() => navigate(`/admin/reviseChart/${patie.patieNum}/${recPatie.recNum}`)}>수정</button>
                  <button onClick={() => delIsNow(recPatie.recNum)}>진료 완료</button>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
