import React, { useEffect, useState } from 'react'
import './Reserv_staff.css'
import { useFetcher } from 'react-router-dom';
import axios from 'axios';

const Reserv_staff = () => {

  const [allRecList, setAllRecList] = useState();

  useEffect(()=>{
    axios.get('/rec/selectAllRec')
    .then((res) =>{
      setAllRecList(res.data);
    })
    .catch((error) =>{console.log(error)})
  }, []);
  



  return (
    <div className='reserv-staff'>
      <div className='title'>예약관리</div>
      <div className='reservStaff-content'>
        <div className='content-up'>
          <div className='reservList'>
            <div>예약환자 리스트</div>
            <div >
              <table className='reservUserList'>
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
                    <td>연락처</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    allRecList.map((rec, i)=>{
                      return(
                        <tr>
                          <td>{allRecList.length-i}</td>
                          <td>{rec.recDate}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='updateReserv'>
            <div>예약정보 수정</div>
            <div></div>
          </div>
        </div>
        <div className='content-down'>
          <div>??????????</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Reserv_staff