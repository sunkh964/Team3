import React, { useEffect, useState } from 'react';
import './Chart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chart = () => {
  const navigate = useNavigate();
  // 당일 예약 환자 담을 배열
  const [resMemList, setResMemList] = useState([]);
  // 진료 환자 담을 배열
  const [nowResMem, setNowResMem] = useState([]);
  
  // 당일 예약 환자 리스트
  useEffect(() => {
    axios.get('/chart/chartList')
      .then((res) => {
        setResMemList(res.data);
      })
      .catch((error) => { console.log(error); });
  }, []);

  // 진료 환자 리스트
  useEffect(() => {
    axios.get('/chart/getIsNowMemChart')
      .then((res) => {
        setNowResMem(res.data);
      })
      .catch((error) => { console.log(error); });
  }, []);

  // 진료환자 등록 버튼
  function goIsNow(chartNum) {
    if (window.confirm('진료환자로 변경하시겠습니까?')) {
      axios.put('/chart/changeIsNow', { chartNum })
        .then(() => window.location.reload())
        .catch((error) => { console.log(error); });
    } else {
      alert('변경이 취소되었습니다.');
    }
  }

  // 환자 집보내기
  function delIsNow(chartNum) {
    if (window.confirm('진료환자를 지우겠습니까?')) {
      axios.put('/chart/delIsNow', { chartNum })
        .then(() => window.location.reload())
        .catch((error) => { console.log(error); });
    } else {
      alert('취소되었습니다.');
    }
  }

  // 검색 환자 넣을 배열
  const [searchMems, setSearchMems] = useState([]);
  // 검색 객체
  const [searchData, setSearchData] = useState({
    searchType: 'MEM_NAME',
    searchValue: ''
  });

  // 검색내용 값 변경
  function changeSearchData(e) {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  }

  // 검색 버튼 클릭시 실행되는 함수
  function searchMem() {
    axios.post('/member/searchMem', searchData)
      .then((res) => {
        setSearchMems(res.data);
      })
      .catch((error) => { console.log(error); });
  }

  return (
    <div className='chart'>
      <div className='title'>환자 차트</div>
      <div className='mainChart'>
        <div className='chartLeft'>
          <div className='todayReg'>
            <div className='todayTop'>
              <p>당일 예약 환자</p>
              <button onClick={() => navigate('/admin/addChart')}>추가</button>
            </div>

            <div className='topContent'>
              {resMemList.map((resMem, i) => {
                const member = resMem.resMemList[0]?.memberList[0];
                const chartNum = resMem.chartNum;
                return (
                  <div className='todayRegContent' key={i}>
                    <div className='divF'>
                      <div className='clickDetail' onClick={() => navigate(`/admin/history/${member.memNum}`)}>이름 : {member ? member.memName : null}</div>
                      <div>생년월일 : {member ? member.memBirth : null}</div>
                      <div>성별: {member ? member.memGen : null}</div>
                    </div>
                    <div className='divFSec'>
                      <div>연락처 : {member ? member.memTel : null}</div>
                      <div>
                        <span onClick={() => navigate(`/admin/reviseChart/${member.memNum}/${chartNum}`)}>수정</span>
                        <span onClick={() => delIsNow(chartNum)}>삭제</span>
                        <button onClick={() => goIsNow(chartNum)}>진료환자 등록</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='searchMem'>
            <div className='searchTitle'>
              <span>환자 검색</span>
              <div className='search'>
                <input type='text'  name='searchValue'  onChange={changeSearchData}/>
                <button onClick={searchMem}>검색</button>
              </div>
            </div>
            <div className='searchContent'>
              <div className='searchResultContent'>
                {searchMems.map((mem, i) => (
                  <div className='searchResult' key={i}>
                    <div>
                      <span className='clickDetail' onClick={() => navigate(`/admin/history/${mem.memNum}`)}>이름 : {mem.memName}</span>
                      <span>생년월일 : {mem.memBirth}</span>
                    </div>
                    <div>
                      <span>연락처 : {mem.memTel}</span>
                      <span>성별 : {mem.memGen}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='medTreat'>
          <div className='medTop'><p>진료 환자</p></div>
          <div className='trContent'>
            {nowResMem.map((resMem, i) => {
              const member = resMem.resMemList[0]?.memberList[0];
              const resMember = resMem.resMemList[0];
              const chartNum = resMem.chartNum;
              return (
                <div className='treatContent' key={i}>
                  <div className='divTrF'>
                    <div>예약번호 : {resMember ? resMember.resNum : null}</div>
                  </div>
                  <div className='divTrF'>
                    <div className='clickDetail' onClick={() => navigate(`/admin/history/${member.memNum}`)}>이름 : {member ? member.memName : null}</div>
                    <div>생년월일 : {member ? member.memBirth : null}</div>
                    <div>성별: {member ? member.memGen : null}</div>
                  </div>
                  <div className='divTrT'>
                    <div>진료 부서 : {resMember ? resMember.partList[0].partName : null}</div>
                    <div>담당의 : {resMember ? resMember.staffList[0].staffName : null}</div>
                  </div>

                  <div className='botBut'>
                    <button onClick={() => navigate(`/admin/reviseChart/${member.memNum}/${chartNum}`)}>수정</button>
                    <button onClick={() => delIsNow(chartNum)}>환자 삭제</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
