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
                <input type='text'/>
              </td>
              <td>부서번호</td>
              <td>
                <select>
                  {
                    partList.map((part, i) =>{
                      return(
                        <option key={i}>{part.partName}</option>
                      );
                    })
                  }
                </select>
              </td>
            </tr>
            <tr>
              <td>주민번호</td>
              <td>
                <input type='text'/>
              </td>
              <td>연락처</td>
              <td>
                <input type='text'/>
              </td>
            </tr>
            <tr>
              <td>주소</td>
              <td>
                <input type='text'/>
              </td>
              <td>성별</td>
              <td>
                <input type='radio'/>남
                <input type='radio'/>여
              </td>
            </tr>
          </table>
        </div>
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