import React, { useEffect, useState } from 'react';
import './Reserv_staff.css';
import axios from 'axios';

const Reserv_staff = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [todayRecList, setTodayRecList] = useState([]);
  const [allRecList, setAllRecList] = useState([]);
  const [recDetail, setRecDetail] = useState({});
  const [selectedRow, setSelectedRow] = useState(null); // 클릭된 행의 인덱스를 저장

  useEffect(() => {
    axios.get('/rec/selectTodayRec')
      .then((res) => {
        setTodayRecList(res.data);
        console.log(res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    axios.get('/rec/selectAllRec')
      .then((res) => {
        setAllRecList(res.data);
        console.log(res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  function getRecDetail(recNum) {
    axios.get(`/rec/getRecInfo/${recNum}`)
      .then((res) => {
        setRecDetail(res.data);
      })
      .catch((error) => { console.log(error) });
  }

  return (
    <div className='reserv-staff'>
      <div className='title'>예약관리</div>
      <div className='reservStaff-content'>
        <div className='content-up'>
          <div className='reservList'>
            <div className='resList-title'>금일 예약 리스트 [ <span>{new Date().toLocaleDateString('ko-KR')}</span> ]</div>
            <div className='resUserList'>
              <table className='resUserList-table'>
                <colgroup>
                  <col width='10%' />
                  <col width='20%' />
                  <col width='16%' />
                  <col width='16%' />
                  <col width='16%' />
                  <col width='22%' />
                </colgroup>
                <thead>
                  <tr>
                    <td>No.</td>
                    <td>예약 시간</td>
                    <td>진료과</td>
                    <td>담당의료진</td>
                    <td>이름</td>
                    <td>생년월일</td>
                  </tr>
                </thead>
                <tbody>
                  {todayRecList.map((rec, i) => {
                    return (
                      <tr key={i} onClick={() => { getRecDetail(rec.recNum); setSelectedRow(i); }} className={selectedRow === i ? 'highlight' : ''}>
                        <td>{i + 1}</td>
                        <td>{rec.recDate}</td>
                        <td>{rec.staffVO.part.partName}</td>
                        <td>{rec.staffVO.staffName}</td>
                        <td>{rec.patieVO.patieName}</td>
                        <td>{rec.patieVO.patieBirth}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='updateReserv'>
            <div className='resList-title'>예약정보 수정/삭제</div>
            <table className='updateRes-table'>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tr>
                <td>이름</td>
                <td>: {recDetail.patieVO ? recDetail.patieVO.patieName : ''}</td>
                <td>생년월일</td>
                <td>: {recDetail.patieVO ? recDetail.patieVO.patieBirth : ''}</td>
              </tr>
              <tr>
                <td>진료부서</td>
                <td><input value={recDetail.staffVO ? recDetail.staffVO.part.partName : ''} /></td>
                <td>의료진</td>
                <td><input value={recDetail.staffVO ? recDetail.staffVO.staffName : ''} /></td>
              </tr>
              <tr>
                <td>예약시간</td>
                <td><input type='datetime-local' value={recDetail.recDate} /></td>
                <td>증상</td>
                <td><input value={recDetail.recDetail} /></td>
              </tr>
            </table>
            <div className='resList-btn'>
              <button type='button' onClick={() => { }}>수정</button>
              <button type='button' onClick={() => { }}>삭제</button>
            </div>
          </div>
        </div>
        <div className='content-down'>
          <div className='resList-title'>예약환자 리스트 ( <span>{allRecList.length}</span> )</div>
          <div className='resUserList'>
            <table className='resUserList-table'>
              <colgroup>
                <col width='10%' />
                <col width='20%' />
                <col width='16%' />
                <col width='16%' />
                <col width='16%' />
                <col width='22%' />
              </colgroup>
              <thead>
                <tr>
                  <td>No.</td>
                  <td>예약 시간</td>
                  <td>진료과</td>
                  <td>담당의료진</td>
                  <td>이름</td>
                  <td>생년월일</td>
                </tr>
              </thead>
              <tbody>
                {allRecList.map((rec, i) => {
                  return (
                    <tr key={i} onClick={() => { getRecDetail(rec.recNum); setSelectedRow(i); }} className={selectedRow === i ? 'highlight' : ''}>
                      <td>{i + 1}</td>
                      <td>{rec.recDate}</td>
                      <td>{rec.staffVO.part.partName}</td>
                      <td>{rec.staffVO.staffName}</td>
                      <td>{rec.patieVO.patieName}</td>
                      <td>{rec.patieVO.patieBirth}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserv_staff;
