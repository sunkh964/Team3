import React from 'react'
import './ReviseChart.css';

const ReviseChart = () => {
  return (
    <div className='reviseChart'>
      <div className='reviseChartTitle'>차트 수정</div>
      <table>
        <thead>
          <tr>
            <td colSpan={2}>진료 이력 번호 : </td>
          </tr>
          <tr>
            <td><span>이름</span> : </td>
            <td><span>생년월일</span> : </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>예약 날짜</span> : <input type='text'/></td>
            <td><span>당일 진료</span> : <input type='text'/></td>
          </tr>
          <tr>
            <td><span>진료 부서</span> : <input type='text'/></td>
            <td><span>담당의</span> : <input type='text'/></td>
          </tr>
          <tr>
            <td><span>병명</span> : <input type='text'/></td>
            <td><span>세부사항</span> : <input type='text'/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ReviseChart