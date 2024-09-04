import React, { useEffect, useState } from 'react'
import './StaffManage.css'
import './calendar.css'
import './datepicker.css'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
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

  //세션에 있는 로그인 정보를 받아 옴
  const sessionLoginInfo =  window.sessionStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(sessionLoginInfo);

  // ============================등록하기용============================
  // 이벤트 컬러칩 저장
  const colorBoxes = ['#ff6363', '#fac35c', '#95c570', '#8dd4f5', '#a89de4', '#f88dbf', '#858585']
  // const colorBoxes = ['#ff6363', '#fac35c', '#95c570', '#8dd4f5', '#a89de4', '#f88dbf']

  // 새 이벤트 저장할 곳 선언
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    staffNum: loginInfo.staffNum, 
    allDay : 'Y',
    color : colorBoxes[0]
  });
  // 이벤트 추가 모달창 표시 여부
  const [addEventAddModal, setEventAddModal] = useState(false);
  // 하루종일 체크 여부 저장
  //const [isAllChecked, setIsAllChecked] = useState(true);
  // ============================조회하기용============================
  // 일정 번호 불러오기
  const [schNum, setSchNum] = useState(0);
  // 일정 상세 저장할 곳 선언
  const [eventDetail, setEventDetail] = useState({});
  // 이벤트 상세 모달창 표시 여부
  const [eventDetailModal, setEventDetailModal] = useState(false);
  const [modifyActive, setModifyActive] = useState(false);
  const [isPersonal, setIsPersonal] = useState(true);

  // ============================불러오기용============================
  // 리스트 불러오기
  useEffect(() => {
    // axios.get('/schedule/getAllList')
    // axios.get(`/schedule/getOneList/${loginInfo.staffNum}`)
    axios.get(`/schedule/getAllSchedule/${loginInfo.staffNum}`)
    .then((res) => {
      const result =  res.data.map((each) => {
        const a = each.allDay == 'Y'  ? true : false;
        return {...each, allDay : a}
      })
      setAllList(result);
    })
    .catch((error) => {alert(error);});
  }, []);

  // ============================등록하기용============================
  // 날짜 클릭 시 연결된 함수(이벤트 추가)
  const handleDateClick = (e) => {
    setNewEvent({
      ...newEvent,
      start : new Date(e.dateStr + 'T09:00:00'),
      end : new Date(e.dateStr + 'T10:00:00')
    });
    setEventAddModal(true);
  }

  // 일정 내용 변경 함수 onChange
  function changeEvent(e) {
    setNewEvent({
      ...newEvent,
      [e.target.name] : e.target.value
    })
  }

  // 일정 추가 모달 content 내용
  function drawModalContent1() {
    return (
      <div className='event-modal-div'>
        <table className='input-form'>
          <tbody>
            <tr>
              <td colSpan={4}><input type='checkBox' name='isAll' className='isAll' checked={newEvent.allDay == 'Y'} onChange={() => {checkChange()}} />하루 종일</td>
            </tr>
            <tr>
              <td>날짜</td>
              <td>
                <DateSelect name='start' 
                  setNewEvent={setNewEvent} newEvent={newEvent} targetName={'start'}
                  clickDate={newEvent.start}
                />
              </td>
              <td>→</td>
              <td>
                <DateSelect name='end'
                  setNewEvent={setNewEvent} newEvent={newEvent} targetName={'end'}
                  clickDate={newEvent.end} 
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
            <tr>
              <td>색상</td>
              <td colSpan={3}>
                <div className='color-selector'>
                  {
                    colorBoxes.map((colorName, i) => {
                      return (
                        <input
                          type='radio' key={i} name='color' className={`color c${i+1}`} value={colorName}
                          onClick={(e) => {changeEvent(e)}}
                          defaultChecked={ (i == 0) ? true : false}
                        />
                      )
                    })
                  }
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  // 일정 추가 모달 footerContent 내용
  function drawFooterContent1() {}

  // 일정 추가 모달 확인 버튼 함수
  function handleBtn1() {
    newEvent.allDay = newEvent.allDay == 'Y' ? true : false;
    axios.post('/schedule/addEvent', newEvent)
    .then((res) => {
      console.log("등록 완료")})
      navigate(0)
      .catch((error) => {
      alert(error)});
  }

    // '하루종일' 체크여부 변경
    function checkChange() {
      //setIsAllChecked(!isAllChecked);
      setNewEvent({
        ...newEvent,
        allDay: newEvent.allDay == 'Y' ? 'N' : 'Y'
      })
    }

  // ============================조회하기용============================
  // 일정 클릭 시 연결된 함수(이벤트 조회)
  const eventClick = (e) => {
    // console.log(e.event.extendedProps.personalYN);
    setSchNum(e.event.extendedProps.schNum);
    if(e.event.extendedProps.personalYN == 'Y') {
      setIsPersonal(true);
    } else {
      setIsPersonal(false);
    }
    setEventDetailModal(true);
  }

  //DetailModal이 활성화되면 상세 정보를 조회
  useEffect(() => {
    if(eventDetailModal){
      if(isPersonal) {
        axios.get(`/schedule/getDetail/${schNum}`)
        .then((res) => {
          console.log(res.data)

          setEventDetail({
            ...res.data,
            allDay : res.data.allDay == 'Y' ? true : false,
            start : new Date(res.data.start),
            end : new Date(res.data.end)
          });
        })
        .catch((error) => {alert(error)});
      } else {
        console.log(schNum);
        axios.get(`/schedule/getRecDetail/${schNum}`)
        .then((res) => {
          console.log(res.data);
          setEventDetail(res.data);
        })
        .catch((error) => {alert(error)});
      }
      
    }
  }, [eventDetailModal])


  const [selectedColor, setSelectedColor] = useState(0);

  //상세 정보가 조회되면 해당 정보의 컬러값 세팅
  useEffect(() => {
    if(Object.keys(eventDetail).length != 0 ){
      colorBoxes.map((color, i) => {
        if (eventDetail.color == color) {
          //console.log('!!!!!!' + (i+ 1))
          setSelectedColor(i + 1);
        }
      })
    }
  }, [eventDetail])

    // 일정 내용 변경 함수 onChange
    function changeEventDetail(e) {
      setEventDetail({
        ...eventDetail,
        schNum : schNum,
        [e.target.name] : e.target.value
      })
    }

  // 일정 상세 모달 content 내용
  function drawModalContent2() {
    return (
      <div className='event-modal-div'>
        <table className='detail-table'>
          <tbody>
            <tr>
              <td>색상</td>
              <td colSpan={3}>
                <input type='radio' className={`color c${selectedColor} view`} value={eventDetail.color} ></input>
                {
                  colorBoxes.map((colorName, i) => {
                    return (
                      <input
                        type='radio' key={i} name='color' className={`color c${i+1} modify-form`} value={colorName}
                        onChange={(e) => {changeEventDetail(e)}}
                        checked={ i+1 == selectedColor ? true : false}
                      />
                    )
                  })
                }
              </td>
            </tr>
            <tr>
              <td>날짜</td>
              <td>
                <span className='view'>{eventDetail.start && eventDetail.allDay ? moment(eventDetail.start).format("YYYY-MM-DD") : moment(eventDetail.start).format("YYYY-MM-DD HH:mm:ss")}</span>
                {
                  modifyActive ?
                  <DateSelect className='modify-form'
                  //setNewEvent={setNewEvent} newEvent={newEvent} targetName={'start'}
                  setNewEvent={setEventDetail} newEvent={eventDetail} targetName={'start'}
                  clickDate={eventDetail.start} /> 
                : false
                }
              </td>
              <td>→</td>
              <td>
                <span className='view'>{eventDetail.end && eventDetail.allDay ? moment(eventDetail.end).format("YYYY-MM-DD") : moment(eventDetail.end).format("YYYY-MM-DD HH:mm:ss")}</span>
                {
                  modifyActive ?
                  <DateSelect className='modify-form'
                  setNewEvent={setEventDetail} newEvent={eventDetail} targetName={'end'}
                  clickDate={eventDetail.end}
                  /> 
                  : false
                }
              </td>
            </tr>
            <tr>
              <td>제목</td>
              <td colSpan={3}>
                <span className='view'>{eventDetail.title}</span>
                <input className='modify-form' name='title' value={eventDetail.title} onChange={(e) =>{changeEventDetail(e)}} />
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td colSpan={3}>
                <span className='view'>{eventDetail.description}</span>
                <input className='modify-form' name='description' value={eventDetail.description} onChange={(e) => {changeEventDetail(e)}} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function drawModalContent3() {
    return (
      <div className='event-modal-div'>
        <table className='detail-table'>
          <tbody>
            <tr>
              <td>날짜</td>
              <td>
                <span className='view'>{moment(eventDetail.recDate).format("YYYY-MM-DD HH:mm")}</span>
              </td>
              <td>→</td>
              <td>
                <span className='view'>{moment(eventDetail.recEDate).format("YYYY-MM-DD HH:mm")}</span>
              </td>
            </tr>
            <tr>
              <td>환자명</td>
              <td colSpan={3}><span className='view'>{eventDetail.patieVO && eventDetail.patieVO.patieName}</span></td>
            </tr>
            <tr>
              <td>특이사항</td>
              <td colSpan={3}><span className='view'>{eventDetail.recDetail}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function drawFooterContent3() {
    return ;
  }

  // 일정 상세 모달 footerContent 내용
  function drawFooterContent2() {
    if (!modifyActive) {
      return (
        <>
          <button type='button' className='modifyBtn' onClick={() => {eventModifyBtn()}} >수정</button>
          <button type='button' className='deletnBtn' onClick={() => {eventDeleteBtn()}} >삭제</button>
        </>
      )
    }
    else { return ; }
  }

  // 일정 상세 모달 확인 버튼 함수
  function handleBtn2() {
    console.log(eventDetail)
    if (modifyActive) {
      axios.post('/schedule/modifyEvent', eventDetail)
      .then(() => {alert("수정 완료"); navigate(0);})
      .catch((error) => {alert(error)});
    } else { return ; }
  }

  // 일정 상세 수정 버튼 활성화 시 css 변경 함수
  function eventModifyBtn() {
    setModifyActive(modifyActive ? false : true);

    var modify = document.querySelectorAll('.modify-form');
    var view = document.querySelectorAll('.view');

    if (!modifyActive) {
      modify.forEach(element => { element.style.display = 'inline-block' });
      view.forEach(element => { element.style.display = 'none' });
    } else {
      modify.forEach(element => { element.style.display = 'none' });
      view.forEach(element => { element.style.display = 'inline-block' });
    }
  }

  // 일정 상세 삭제 버튼 함수
  function eventDeleteBtn() {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      axios.delete(`/schedule/deleteEvent/${schNum}`)
      .then((res) => {
        alert("삭제 완료");
        navigate(0);
      })
      .catch((error) => {alert(error)})
    } else {
      return ;
    }
  }


  function drawScheduleDetailModal(){
    if(isPersonal){
      return (
        <Modal content={drawModalContent2} footerContent={drawFooterContent2} setIsShow={setEventDetailModal} clickCloseBtn={handleBtn2} setModifyActive={setModifyActive} />
      )
    }else{
      return (<Modal content={drawModalContent3} footerContent={drawFooterContent3} setIsShow={setEventDetailModal} clickCloseBtn={handleBtn2} setModifyActive={setModifyActive} />);
    }
  }

  return (
    <div className='calendar-div'>
      <FullCalendarContainer>
        <FullCalendar className='calendar'
        //  timezone={'local'}
          // plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventClick={eventClick}
          headerToolbar = {{
            left: 'today,prev,next',
            center: 'title',
            // right: 'dayGridMonth,timeGridWeek,listWeek'}} 
            right: 'dayGridMonth'}} 
          events={allList}
          locale={"ko"}
          timeZone='local'
          dayCellContent={function (info) {
            var number = document.createElement("a");
            number.classList.add("fc-daygrid-day-number");
            number.innerHTML = info.dayNumberText.replace("일", '').replace("日","");
            if (info.view.type === "dayGridMonth") {return {html: number.outerHTML};}
            return {domNodes: []};}}
          eventDataTransform={function(event) {
            if(true) {
              event.end = moment(event.end).add(1, 'days').format("YYYY-MM-DD")
            }
            return event;
          }}
        />
      </FullCalendarContainer>

      {/* 일정 추가 모달창 */}
      {
        addEventAddModal ? <Modal content={drawModalContent1} footerContent={drawFooterContent1} setIsShow={setEventAddModal} clickCloseBtn={handleBtn1} setModifyActive={setModifyActive} />
        :
        null
      }

      {/* 일정 상세 모달창 */}
      {
        eventDetailModal
        ?
        drawScheduleDetailModal()
        :
        null
      }

    </div>
  )
}

export default StaffManage