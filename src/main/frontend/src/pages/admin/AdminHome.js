import React from 'react'
import './AdminHome.css';
const AdminHome = () => {
  return (
    <div className='home-div'>
      <div className='add-div'>
         <div>환자 추가</div>
      </div>
      <div className='other-div'>
         <div className='other1-div' >
            <div className='schedule-div'>월별시간표/당일예약자</div>
            <div className='messenger-div'>단체메신저</div>
         </div>
         <div className='other2-div'>일별시간표/와있는사람</div>

      </div>
   </div>
  )
}

export default AdminHome