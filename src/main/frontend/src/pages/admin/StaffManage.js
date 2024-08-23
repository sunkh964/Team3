import React from 'react'
import './StaffManage.css'
import './calendar.css'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction"
import styled from 'styled-components'

const StaffManage = () => {
  const handleDateClick = (e) => {
    console.log(e.dateStr)
  }

  const FullCalendarContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    // 캘린더 전체 사이즈 조정
    .fc {
      width: 100%;
    }
  `;

  return (
    <div className='calendar-div'>
      <FullCalendarContainer>
        <FullCalendar className='calendar' plugins={[dayGridPlugin, interactionPlugin]} dateClick={handleDateClick} 
          events={[
            { title: 'event 1', date: '2024-08-23' },
            { title: 'event 1', date: '2024-08-23' },
            { title: 'event 2', date: '2024-08-03' }
        ]}
        />
      </FullCalendarContainer>
    </div>
  )
}

export default StaffManage