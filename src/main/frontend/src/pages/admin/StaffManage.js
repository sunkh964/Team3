import React, { useEffect, useState } from 'react'
import './StaffManage.css'
import './calendar.css'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction"
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from '../../common/Modal'
import DateSelect from '../../common/DateSelect'

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

const StaffManage = () => {
  // 내비게이션 함수 선언
  const navigate = useNavigate();
  // 일정 리스트 저장할 곳 선언
  const [allList, setAllList] = useState([]);
  // 모달창 표시 여부
  const [addEventModal, setAddEventModal] = useState(false);
  // 시작 날짜 저장할 곳 선언
  const [startDate, setStartDate] = useState(new Date());
  // 새 이벤트 저장할 곳 선언
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: startDate,
    end: startDate,
    description: ''
  });
  
  // 리스트 불러오기
  useEffect(() => {
    axios.get('/schedule/getAllList')
    .then((res) => {
      console.log(res.data);
      setAllList(res.data);
    })
    .catch((error) => {alert(error);});
  }, []);

  // 날짜 클릭 시 연결된 함수
  const handleDateClick = (e) => {
    setStartDate(new Date(e.dateStr));
    setAddEventModal(true);
  }

  // 일정 클릭 시 연결된 함수
  const eventClick = (e) => {
    console.log(e.event);
  }

  // 일정 변경 함수 onChange
  function changeEvent(e) {
    if (e.target.name == 'start') {
      var startStr = new Date(e.target.value);
    }
    if (e.target.name == 'end') {
      const endStr = new Date(e.target.value);
    }
    setNewEvent({
      ...newEvent,
      [e.target.name] : e.target.name != 'start' ? e.target.value : startStr
    })
  }

  // 새 일정 추가하는 모달 안의 내용
  function drawModalContent() {
    return (
      <div className='event-form-div'>
        <table className='input-form'>
          <tbody>
            <tr>
              <td colSpan={4}><input type='checkBox' name='isAll' className='isAll' />하루 종일</td>
            </tr>
            <tr>
              <td>날짜</td>
              <td>
                <DateSelect name='start'
                  onChange={(e) => {changeEvent(e); console.log(e.target.value)}}
                  clickDate={startDate} />
              </td>
              <td>→</td>
              <td><DateSelect name='end' onChange={(e) => {changeEvent(e)}}  clickDate={startDate} /></td>
            </tr>
            <tr>
              <td>제목</td>
              <td colSpan={3}><input type='text' name='title' onChange={(e) => {changeEvent(e)}} /></td>
            </tr>
            <tr>
              <td>내용</td>
              <td colSpan={3}><textarea name='description' rows={3} onChange={(e) => {changeEvent(e)}} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  // 새 일정 추가하는 모달 확인 버튼 함수
  function handleBtn() {
    // axios.post('/schedule/addEvent', newEvent)
    // .then((res) => {console.log("등록 완료")})
    // .catch((error) => {alert(error)});
    console.log(newEvent);
  }

  return (
    <div className='calendar-div'>
      <FullCalendarContainer>
        <FullCalendar className='calendar'
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventClick={eventClick}
          headerToolbar = {{
            left: 'today,prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'}} 
          events={allList}
        />
      </FullCalendarContainer>

      {
        addEventModal ? <Modal content={drawModalContent} setIsShow={setAddEventModal} clickCloseBtn={handleBtn} />
        :
        null
      }
    </div>
  )
}

export default StaffManage