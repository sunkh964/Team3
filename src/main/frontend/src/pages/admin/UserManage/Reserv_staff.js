import React, { useEffect, useState } from 'react'
import './Reserv_staff.css'
import { useFetcher } from 'react-router-dom';
import axios from 'axios';

const Reserv_staff = () => {

  const [todayRecList, setTodayRecList] = useState([]);

  const [allRecList, setAllRecList] = useState([]);

  // 당일 예약 리스트
  useEffect(()=>{
    axios.get('/rec/selectTodayRec')
    .then((res) =>{
      setTodayRecList(res.data);
      console.log(res.data);
    })
    .catch((error) =>{console.log(error)})
  }, []);

  // 전체 예약 리스트
  useEffect(()=>{
    axios.get('/rec/selectAllRec')
    .then((res) =>{
      setAllRecList(res.data);
      console.log(res.data);
    })
    .catch((error) =>{console.log(error)})
  }, []);
  



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
                  <col width='10%'/>
                  <col width='20%'/>
                  <col width='16%'/>
                  <col width='16%'/>
                  <col width='16%'/>
                  <col width='22%'/>
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
                  {
                    todayRecList.map((rec, i)=>{
                      return(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{rec.recDate}</td>
                          <td>{rec.staffVO.part.partName}</td>
                          <td>{rec.staffVO.staffName}</td>
                          <td>{rec.patieVO.patieName}</td>
                          <td>{rec.patieVO.patieBirth}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='updateReserv'>
            <div className='resList-title'>예약정보 수정</div>
            <div></div>
          </div>
        </div>
        <div className='content-down'>
          <div className='resList-title'>예약환자 리스트 ( <span>{allRecList.length}</span> )</div>
          <div className='resUserList'>
              <table className='resUserList-table'>
                <colgroup>
                  <col width='10%'/>
                  <col width='20%'/>
                  <col width='16%'/>
                  <col width='16%'/>
                  <col width='16%'/>
                  <col width='22%'/>
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
                  {
                    allRecList.map((rec, i)=>{
                      return(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{rec.recDate}</td>
                          <td>{rec.staffVO.part.partName}</td>
                          <td>{rec.staffVO.staffName}</td>
                          <td>{rec.patieVO.patieName}</td>
                          <td>{rec.patieVO.patieBirth}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Reserv_staff