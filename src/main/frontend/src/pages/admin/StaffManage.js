import React, { useEffect, useState } from 'react'
import './StaffManage.css'
import './calendar.css'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction"
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StaffManage = () => {
  // 내비게이션 함수 선언
  const navigate = useNavigate();

  // 일정 리스트 저장할 곳 선언
  const [allList, setAllList] = useState([]);


  // 날짜 클릭 시
  const handleDateClick = (e) => {
    console.log(e.dateStr)
  }

  useEffect(() => {
    axios.get('/schedule/getAllList')
    .then((res) => {
      console.log(res.data);
      setAllList(res.data);
    })
    .catch((error) => {alert(error);});
  }, [])


  console.log(allList);

  // 캘린더 위치 조정용 컴포넌트 설정
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
          events={allList}
        />
      </FullCalendarContainer>
    </div>
  )
}

export default StaffManage