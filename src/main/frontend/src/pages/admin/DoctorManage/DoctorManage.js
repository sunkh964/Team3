import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './DoctorManage.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import DoctorHome from './DoctorHome';

const DoctorManage = () => {
  const navigate = useNavigate();

  // 부서목록 저장 state
  const [partList, setPartList] = useState([]);

  // 직원 등록시 가져갈 데이터
  const [insertStaff, setInsertStaff] = useState({
    staffName : '',
    partNum : 1,
    staffId : '',
    staffPw : '',
    staffBirth : '',
    staffTel : '',
    staffAddr : '',
    staffGen : '남'
  });

  // 직원리스트 조회 state
  const [staffList, setStaffList] = useState([]);

  // 부서목록 조회
  useEffect(() => {
    axios.get('/staff/getPart')
    .then((res)=>{
      setPartList(res.data);
    })
    .catch((error) => {console.log(error)})
  },[]);

  // ----------- 직원 조회---------------

  // 직원 조회
  useEffect(() => {
    axios.get('/staff/getStaff')
    .then((res) => {
      console.log(res.data);
      setStaffList(res.data);
    })
    .catch((error) => {console.log(error)})
  },[]);

  // ----------- 직원 등록---------------

  // 등록전 입력값 저장
  function changeInsertStaffData(e){
    setInsertStaff({
      ...insertStaff,
      [e.target.name] : e.target.value
    });
  }

  // 직원 등록
  function regStaff(){
    axios.post('/staff/regStaff',insertStaff)
    .then((res)=>{
      alert('직원등록')
    })
    .catch((error) => {console.log(error)})
  }


  return (
    <div className='doctorManage'>
      <div className='doctor-sideList'>
        <ul>
          <li>직원등록 및 현황</li>
          <li onClick={()=>{navigate('/admin/staffDetail/:staffNum')}}>직원정보 수정 및 삭제</li>
        </ul>
      </div>

      <div className='doctor-content'>
        <div className='regStaff'>
          <div className='doctor-title'>직원 등록</div>
          <div>
            <table className='regStaff-table'>
              <tr>
                <td>이름</td>
                <td>
                  <input type='text' name='staffName'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
                <td>부서번호</td>
                <td>
                  <select name='partNum' onChange={(e) => {changeInsertStaffData(e)}}>
                    {
                      partList.map((part, i) =>{
                        return(
                          <option key={i} value={part.partNum}>{part.partName}</option>
                        );
                      })
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <td>아이디</td>
                <td>
                  <input type='text' name='staffId'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
                <td>비밀번호</td>
                <td>
                  <input type='text' name='staffPw'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
              </tr>
              <tr>
                <td>주민번호</td>
                <td>
                  <input type='text' name='staffBirth'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
                <td>연락처</td>
                <td>
                  <input type='text' name='staffTel'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td>
                  <input type='text' name='staffAddr'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
                <td>성별</td>
                <td>
                  <input type='radio' name='staffGen' value="남"
                      onChange={(e) => {changeInsertStaffData(e)}} checked={insertStaff.staffGen == '남'}/>남
                  <input type='radio' name='staffGen' value="여"
                    onChange={(e) => {changeInsertStaffData(e)}}
                    checked={insertStaff.staffGen == '여'}/>여
                </td>
              </tr>
            </table>
          </div>
          <div className='btn'>
            <button type='button' onClick={(e)=>{regStaff()}}>직원등록</button>
          </div>
        </div>
  
        <div className='getStaff'>
          <div className='doctor-title'>직원목록</div>
          <div>
            <table className='getStaff-table'>
              <colgroup>
              <col width='10%' />
              <col width='20%' />
              <col width='20%' />
              <col width='20%' />
              <col width='20%' />
              </colgroup>
              <thead>
                <tr>
                  <td>No.</td>
                  <td>부서</td>
                  <td>이름</td>
                  <td>생년월일</td>
                  <td>연락처</td>
                </tr>
              </thead>
              <tbody>
                {
                  staffList.map((staff, i) => {
                    return(
                      <tr onClick={() =>{navigate(`/staffDetail/${staff.staffNum}`)}}>
                        <td>{staffList.length - i}</td>
                        <td>{staff.part.partName}</td>
                        <td>{staff.staffName}</td>
                        <td>{staff.staffBirth}</td>
                        <td>{staff.staffTel}</td>
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

export default DoctorManage