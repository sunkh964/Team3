import React from 'react'
import './AdminLayout.css'

const AdminLayout = () => {
  return (
    <div className='adminLayout'>
      <div>환자추가</div>
      <div className='adminLayout-content'>
        <div className='side-menu'>
          <ul>
            <li>진료</li>
            <li>예약</li>
            <li>직원</li>
          </ul>
        </div>
        <div className='show'>
          <div className='show_1'>
            <div>월별시간표/당일예약자</div>
            <div>단체메신저</div>
          </div>
          <div className='show_2'>일별시간표/와있는사람</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout