import React from 'react'
import './History.css';

const History = () => {
  return (
    <div className='historyDiv'>
      <div className='hisTitle'> ID 님 진료 이력</div>

      <div className='hisContent'>

        <div className='conTop'> 
          <div>진료 이력 번호 :  </div>
          <div>차트 번호 : </div> 
          <div>진료 날짜 : </div>
        </div>

        <div className='conBot'> 
          <div>병명 : </div> 
          <div>세부사항 : </div> 
        </div>
        <button>수정</button>

      </div>
    </div>
  )
}

export default History