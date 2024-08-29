import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './DoctorHome.css'
import { useDaumPostcodePopup } from 'react-daum-postcode';

const DoctorHome = () => {
  const navigate = useNavigate();

  //daum 주소 api 팝업창을 띄우기 위한 함수 선언
  const open = useDaumPostcodePopup(); 

  //주소 검색 팝업창이 닫힐 때 실행되는 함수
  function handleComplete(data){
    //도로명주소
    console.log(data.roadAddress);

    //input 태그에 검색한 내용 넣기
    setInsertStaff({
      ...insertStaff,
      staffAddr : data.roadAddress
    });
  }

  // 주소창 클릭 시 실행되는 함수
  function addrClick(){
    open({onComplete : handleComplete});
  }

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
      navigate(0);
    })
    .catch((error) => {console.log(error)})
  }

  return (
    <div>
      <div className='regStaff'>
          <div className='doctor-title'>직원 등록</div>
          <div>
            <table className='regStaff-table'>
              <tr>
              <td>진료부서</td>
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
                <td>이름</td>
                <td>
                  <input type='text' name='staffName'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
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
                <td>생년월일</td>
                <td>
                  <input type='date' name='staffBirth'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
                <td>연락처</td>
                <td>
                  <input type='text' name='staffTel'
                    onChange={(e) => {changeInsertStaffData(e)}}/>
                </td>
                <td>주소</td>
                <td>
                  <input type='text' name='staffAddr'
                    onChange={(e) => {changeInsertStaffData(e)}}
                    value={insertStaff.staffAddr} readOnly={true} onClick={addrClick}/>
                </td>
                <td>성별</td>
                <td className='radio'>
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
          <div className='doctor-title'>직원 현황 ( <span>{staffList.length}</span> )</div>
          <div className='getStaff-content'>
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
                      <tr onClick={() =>{navigate(`/admin/doctorManage/staffDetail/${staff.staffNum}`)}}>
                        <td>{i+1}</td>
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
  )
}

export default DoctorHome