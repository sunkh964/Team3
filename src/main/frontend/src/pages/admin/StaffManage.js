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
import moment from 'moment'

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
  // ============================불러오기용============================
  // 일정 리스트 저장할 곳 선언
  const [allList, setAllList] = useState([]);
  // ============================등록하기용============================

  // 새 이벤트 저장할 곳 선언
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    staffNum:1
  });
  // 이벤트 추가 모달창 표시 여부
  const [addEventAddModal, setEventAddModal] = useState(false);
  // 하루종일 체크 여부 저장
  const [isAllChecked, setIsAllChecked] = useState(true);
  // ============================조회하기용============================
  // 일정 번호 불러오기
  const [schNum, setSchNum] = useState(0);
  // 일정 상세 저장할 곳 선언
  const [eventDetail, setEventDetail] = useState({});
  // 이벤트 상세 모달창 표시 여부
  const [addEventDetailModal, setEventDetailModal] = useState(false);
  
  // ============================불러오기용============================
  // 리스트 불러오기
  useEffect(() => {
    axios.get('/schedule/getAllList')
    .then((res) => {
      console.log(res.data);
      setAllList(res.data);
    })
    .catch((error) => {alert(error);});
  }, []);

  // ============================등록하기용============================
  // 날짜 클릭 시 연결된 함수(이벤트 추가)
  const handleDateClick = (e) => {
    console.log(e)
    setNewEvent({
      ...newEvent,
      start : new Date(e.dateStr + 'T09:00:00'),
      end : new Date(e.dateStr + 'T23:59:59')
      //start : e.date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
      //end : e.date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    });
    setEventAddModal(true);
  }


console.log(newEvent)

  // 일정 내용 변경 함수 onChange
  function changeEvent(e) {
    setNewEvent({
      ...newEvent,
      [e.target.name] : e.target.value
    })
  }

  // 새 일정 추가하는 모달 안의 내용
  function drawModalContent1() {
    return (
      <div className='event-modal-div'>
        <table className='input-form'>
          <tbody>
            <tr>
              <td colSpan={4}><input type='checkBox' name='isAll' className='isAll' checked={isAllChecked} onChange={() => {checkChange()}} />하루 종일</td>
            </tr>
            <tr>
              <td>날짜</td>
              <td>
                <DateSelect name='start' 
                  setNewEvent={setNewEvent} newEvent={newEvent} targetName={'start'}
                  clickDate={newEvent.start} checked={isAllChecked}
                />
              </td>
              <td>→</td>
              <td>
                <DateSelect name='end'
                  setNewEvent={setNewEvent} newEvent={newEvent} targetName={'end'}
                  clickDate={newEvent.end} checked={isAllChecked}
                />
              </td>
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
  function handleBtn1() {
    axios.post('/schedule/addEvent', newEvent)
    .then((res) => {console.log("등록 완료")})
    .catch((error) => {alert(error)});
    console.log(newEvent);
  }

    // '하루종일' 체크여부 변경
    function checkChange() {
      setIsAllChecked(!isAllChecked);
    }

  // ============================조회하기용============================
  // 일정 클릭 시 연결된 함수(이벤트 조회)
  const eventClick = (e) => {
    setSchNum(e.event.extendedProps.schNum);
    setEventDetailModal(true);
  }

  // 일정 상세 모달 안의 내용
  function drawModalContent2() {
    axios.get(`/schedule/getDetail/${schNum}`)
    .then((res) => {
      console.log(res.data);
      setEventDetail(res.data);
    })
    .catch((error) => {alert(error)});
    return (
      <div className='event-modal-div'>
        <table className='detail-table'>
          <tbody>
            <tr>
              <td>날짜</td>
              <td>
                {eventDetail.start}
              </td>
              <td>→</td>
              <td>{eventDetail.end}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td colSpan={3}>{eventDetail.title}</td>
            </tr>
            <tr>
              <td>내용</td>
              <td colSpan={3}>{eventDetail.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // 일정 상세 모달 확인 버튼 함수
  function handleBtn2() {}


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
          // eventDataTransform={function(event) {
          //   if(!true) {
          //       event.end = moment(event.end).add(2, 'days')
          //   }
          //   return event;  
          // }}
        />
      </FullCalendarContainer>

      {/* 일정 추가 모달창 */}
      {
        addEventAddModal ? <Modal content={drawModalContent1} setIsShow={setEventAddModal} clickCloseBtn={handleBtn1} />
        :
        null
      }

      {/* 일정 상세 모달창 */}
      {
        addEventDetailModal ? <Modal content={drawModalContent2} setIsShow={setEventDetailModal} clickCloseBtn={handleBtn2} />
        :
        null
      }
    </div>
  )
}

export default StaffManage