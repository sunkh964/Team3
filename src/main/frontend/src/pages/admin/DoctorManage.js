import React from 'react'

const DoctorManage = () => {
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
            </tr>
          </table>
        </div>
      </div>
      <div className='getStaff'>
        직원 목록
      </div>
    </div>
  )
}

export default DoctorManage