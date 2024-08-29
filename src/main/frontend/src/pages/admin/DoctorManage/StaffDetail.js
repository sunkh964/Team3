import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './StaffDetail.css'

const StaffDetail = () => {

  const {staffNum} = useParams();

  // 직원 상세 정보를 저장할 변수
  const [staffDetail, setStaffDetail] = useState({part: {}});

  // 직원 상세정보 조회
  useEffect(()=>{
    axios.get(`/staff/getStaffDetail/${staffNum}`)
    .then((res) =>{
      setStaffDetail(res.data);
    })
    .catch((error) =>{console.log(error)})
  },[]);

  return (
    <div className='detailContainer' >
      <div className='staffDetail'>
        <div className='doctor-title'>직원 상세정보</div>
        <table className='staffDetail-table'>
          <colgroup>
            <col width='10%' />
            <col width='20%' />
            <col width='10%' />
            <col width='25%' />
            <col width='10%' />
            <col width='25%' />
          </colgroup>
          <tr>
            <td>이름</td>
            <td>{staffDetail.staffName}</td>
            <td>부서</td>
            <td>{staffDetail.part.partName}</td>
            <td>고용날짜</td>
            <td>{staffDetail.hireDate}</td>
          </tr>
          <tr>
            <td>주민번호</td>
            <td>{staffDetail.staffBirth}</td>
            <td>연락처</td>
            <td>
              <input className='form' type='text' value={staffDetail.staffTel} />
              </td>
            <td>주소</td>
            <td>
              <input className='form' type='text' value={staffDetail.staffAddr} />
            </td>
          </tr>
          <tr>
            <td>성별</td>
            <td>{staffDetail.staffGen}</td>
            <td>아이디</td>
            <td>{staffDetail.staffId}</td>
            <td>비번</td>
            <td>
              <input className='form' type='text' value={staffDetail.staffPw}/>
              </td>
          </tr>
        </table>
      </div>
      <div className='staffDetail-btn'>
        <button type='button'>수정</button>
        <button type='button'>삭제</button>
      </div>
    </div>
  )
}

export default StaffDetail