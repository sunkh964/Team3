import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './StaffChange.css'
import { useNavigate, useParams } from 'react-router-dom';

const StaffChange = () => {
  const navigate = useNavigate();

  const {staffNum} = useParams();

  // 직원 상세정보 목록 state
  const [staffInfoList, setStaffInfoList] = useState([]);

  // 조회
  useEffect(() => {
    axios.get('/staff/getStaffInfo')
    .then((res) =>{
      setStaffInfoList(res.data);
    })
    .catch((error) => {console.log(error)})
  },[]);

  // 직원 삭제
  function deleteStaff(staffNum, staffName, e){
    e.stopPropagation();

    const isConfirm = window.confirm(` '${staffName}' 을 삭제하시겠습니까`);

    if (isConfirm){
      axios.delete(`/staff/deleteStaff/${staffNum}`)
    .then((res) => {
      alert(` '${staffName}' 삭제 완료`);
      navigate(0)
    })
    .catch((error) =>{console.log(error)})
    }
    else{}
  }

  return (
    <div className='staffChange'>
      <div className='doctor-title'>직원 리스트 ( <span>{staffInfoList.length}</span> ) </div>
      <div className='staffChange-content'>
        <table className='staffChange-table'>
          <colgroup>
            <col width='6%'/>
            <col width='10%'/>
            <col width='10%'/>
            <col width='15%'/>
            <col width='16%'/>
            <col width='17%'/>
            <col width='6%'/>
            <col width='14%'/>
            <col width='6%'/>
          </colgroup>
          <thead>
            <tr>
              <td>No.</td>
              <td>진료부서</td>
              <td>이름</td>
              <td>생년월일</td>
              <td>연락처</td>
              <td>주소</td>
              <td>성별</td>
              <td>고용일자</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              staffInfoList.map((info, i) => {
                return(
                  <tr key={i} onClick={() =>{navigate(`/admin/doctorManage/staffDetail/${info.staffNum}`)}} >
                    <td>{staffInfoList.length -i}</td>
                    <td>{info.part.partName}</td>
                    <td>{info.staffName}</td>
                    <td>{info.staffBirth}</td>
                    <td>{info.staffTel}</td>
                    <td>{info.staffAddr}</td>
                    <td>{info.staffGen}</td>
                    <td>{info.hireDate}</td>
                    <td>
                      <button type='button' onClick={(e) =>{deleteStaff(info.staffNum, info.staffName, e)}}>삭제</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffChange