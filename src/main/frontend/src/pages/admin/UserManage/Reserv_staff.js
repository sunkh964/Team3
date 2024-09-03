import React from 'react'
import './Reserv_staff.css'

const Reserv_staff = () => {
  



  return (
    <div className='reserv-staff'>
      <div className='title'>예약관리</div>
      <div className='reservStaff-content'>
        <div className='content-up'>
          <div className='regReserv'>
            <div>예약하기</div>
            <div>
              <table>
                  <tr>
                    <td>이름</td>
                    <td><input /></td>
                    <td>연락처</td>
                    <td></td>
                  </tr>
                </table>
              <div>이름 <input /></div>
              <div>연락처</div>
              <div>예약시간<input /></div>
              <div>진료과</div>
              <div>담당의료진</div>
            </div>
          </div>
          <div className='updateReserv'>
            <div>예약정보 수정</div>
            <div></div>
          </div>
        </div>
        <div className='content-down'>
          <div>예약 리스트</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Reserv_staff