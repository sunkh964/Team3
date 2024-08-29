import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './StaffDetail.css'

const StaffDetail = () => {
  const navigate = useNavigate();

  const {staffNum} = useParams();

  // 직원 상세 정보를 저장할 변수
  const [staffDetail, setStaffDetail] = useState({part: {}});

  // 수정쿼리 실행 시 빈 값을 채울 데이터
  const [updateInfo, setUpdateInfo] = useState({
    staffNum : staffNum,
    staffTel : '',
    staffAddr : '',
    staffId : '',
    staffPw : '',
    hireDate : ''
  });

  function changeUpdateInfo(e){
    setUpdateInfo({
      ...updateInfo,
      [e.target.name] : e.target.value
    });
  }

  // 직원 상세정보 조회
  useEffect(()=>{
    axios.get(`/staff/getStaffDetail/${staffNum}`)
    .then((res) =>{
      setStaffDetail(res.data);
      //수정
      setUpdateInfo({
        ...updateInfo,
        staffTel : res.data.staffTel,
        staffAddr : res.data.staffAddr,
        staffId : res.data.staffId,
        staffPw : res.data.staffPw,
        hireDate : res.data.hireDate
      });
    })
    .catch((error) =>{console.log(error)})
  },[]);

  // 직원정보 수정 등록
  function updateStaff(){
    axios.put('/staff/updateStaff',updateInfo)
    .then((res)=>{
      alert('수정 완료')
      navigate(`/admin/doctorManage/staffDetail/${staffNum}`)
    })
    .catch((error) => {console.log(error)})
  }

  // 직원 삭제
  function deleteStaff(){
    const isConfirm = window.confirm(` '${staffDetail.staffName}' 을 삭제하시겠습니까`);

    if (isConfirm){
      axios.delete(`/staff/deleteStaff/${staffNum}`)
    .then((res) => {
      alert(` '${staffDetail.staffName}' 삭제 완료`);
      navigate('/admin/doctorManage/staffChange')
    })
    .catch((error) =>{console.log(error)})
    }
    else{ navigate(-1) }
    
  }

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
            <td>성별</td>
            <td>{staffDetail.staffGen}</td>
          </tr>
          <tr>
            <td>생년월일</td>
            <td>{staffDetail.staffBirth}</td>
            <td>연락처</td>
            <td>
              <input className='form' type='text' value={updateInfo.staffTel} 
                name='staffTel' onChange={(e) =>{changeUpdateInfo(e)}}/>
              </td>
            <td>주소</td>
            <td>
              <input className='form' type='text' value={updateInfo.staffAddr}
                name='staffAddr' onChange={(e) =>{changeUpdateInfo(e)}} />
            </td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>
              <input className='form' type='text' value={updateInfo.staffId}
                  name='staffId' onChange={(e) =>{changeUpdateInfo(e)}}/>
            </td>
            <td>비번</td>
            <td>
              <input className='form' type='text' value={updateInfo.staffPw}
                name='staffPw' onChange={(e) =>{changeUpdateInfo(e)}}/>
            </td>
            <td>고용날짜</td>
            <td>
              <input className='form' type='date' value={updateInfo.hireDate} 
                name='hireDate' onChange={(e) =>{changeUpdateInfo(e)}}/>
            </td>
          </tr>
        </table>
      </div>
      <div className='staffDetail-btn'>
        <button type='button' onClick={() =>{updateStaff()}}>수정</button>
        <button type='button' onClick={()=>{deleteStaff()}}>삭제</button>
      </div>
    </div>
  )
}

export default StaffDetail