import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DoctorManage = () => {
  // 부서목록 저장 state
  const [partList, setPartList] = useState([]);

  // 부서목록 조회
  useEffect(() => {
    axios.get('/staff/getPart')
    .then((res)=>{
      setPartList(res.data);
    })
    .catch((error) => {console.log(error)})
  },[])

  // 직원 등록시 가져갈 데이터
  const [insertStaff, setInsertStaff] = useState({
    staffName : '',
    partNum : 1,
    staffBirth : '',
    staffTel : '',
    staffAddr : '',
    staffGen : '남'
  });

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
    <div>
      <div>조직원관리, 조직원추가, 수정, 삭제 하기</div>
      <div className='regStaff'>
        <div>직원 등록</div>
        <div>
          <table>
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
        <button type='button' onClick={(e)=>{regStaff()}}>직원등록</button>
      </div>

      <div className='getStaff'>
        <div>직원목록</div>
        <div>
          <table>
            <thead>
              <tr>
                <td>No.</td>
                <td>부서</td>
                <td>이름</td>
                <td>생년월일</td>
                <td>연락처</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DoctorManage