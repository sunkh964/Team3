import React, { useEffect, useRef, useState } from 'react'
import './Reservation.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import './reservCalendar.css'
import styled from 'styled-components';
import PrivacyInfo from './PrivacyInfo';

const Reservation = () => {
  const navigate = useNavigate();

  const {partNum: initialPartNum, staffNum: initialDoctorNum } = useParams();

  // 로그인 정보 확인
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginInfo = sessionLoginInfo ? JSON.parse(sessionLoginInfo) : null;


  // 현재 선택된 부서 번호
  const [partNum, setPartNum] = useState(initialPartNum || '');

  // 선택된 의료진 번호
  const [doctorNum, setDoctorNum] = useState(initialDoctorNum || '');

  // 부서목록 저장
  const [partList, setPartList] = useState([]);

  // 의료진 저장
  const [doctor, setDoctor] = useState([]);

    
  // 예약시 가져갈 데이터
  const [insertRec, setInsertRec] = useState({
    patieNum: loginInfo.patieNum,
    patieName: loginInfo.patieName,
    patieBirth: '',
    patieAddr: '',
    staffNum: 0,
    partNum: 0,
    recDetail:'',
    recDate : ''
  });

  // 공휴일 배열 정의
  const holidays = [
    new Date(2024, 8, 16 ),
    new Date(2024, 8, 17 ),
    new Date(2024, 8, 18 ), 
    new Date(2024, 9, 1),  
    new Date(2024, 9, 3), 
    new Date(2024, 9, 9),  
    new Date(2024, 11, 25)  
];

  // datePicker 평일 및 공휴일 체크
  const isDay = (date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const isHoliday = holidays.some(holiday =>
      holiday.getFullYear() === date.getFullYear() &&
      holiday.getMonth() === date.getMonth() &&
      holiday.getDate() === date.getDate()
  );

  return !(isWeekend || isHoliday);
};

    // ============== recDate 합치기 ============
    const [selectDate, setSelectDate] = useState(null);
    const [selectTime, setSelectTime] = useState(null);

    const handleDateChange =(date)=>{
      setSelectDate(date);
      updateRecDate(date, selectTime) ;
    };

    // const handleTimeChange =(time)=>{
    //   console.log(time);

    //   setSelectTime(time);
    //   updateRecDate(selectDate, time);
    // };



    function updateRecDate(){
      if(selectTime != null){
        const nowDate = new Date(selectDate);
        nowDate.setHours(selectTime, 0,0,0);
  
        const dateString = nowDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
        const timeString = selectTime.toString().padStart(2, '0') + ':00'; // HH:00 형식
        const fullDateString = `${dateString} ${timeString}:00`; // 날짜와 시간 결합
  
        console.log(fullDateString);
  
  
        setInsertRec(prevRec => ({
          ...prevRec,
          recDate: fullDateString
        }));
      }
    };


  //라디오를 클릭해서 selectTime의 값이 바꾸면 바뀐 데이터로 insertRec의 값을 변경
  useEffect(() => {
    if(selectTime != null){
      updateRecDate();
    }
  }, [selectTime]);  


  // 부서목록 조회
  useEffect(() => {
    axios.get('/staff/getPart')
    .then((res)=>{
      setPartList(res.data);

      // 자동선택
      if(res.data.length > 0 && !initialPartNum){
        setPartNum(res.data[0].partNum);
      }
    })
    .catch((error) => {console.log(error)})
  },[initialPartNum]);

  // 의료진 선택 기능
  const selectDoctor = (staffNum) =>{
    setDoctorNum(staffNum);
    setInsertRec(prevRec => ({
      ...prevRec,
      staffNum:staffNum
    }));
  }

  // 담당의 조회
  useEffect(() =>{
    if (partNum) {
      axios.get(`/staff/selectStaffName/${partNum}`)
        .then((res) => {
          setDoctor(res.data);

        // 자동선택
        if(res.data.length > 0 && !initialDoctorNum){
          setDoctorNum(res.data[0].staffNum);
      }
        })
        .catch((error) => { console.log(error) });
    } else {
      setDoctor([]); // partNum 없으면 직원 목록 초기화
    }
  },[partNum]);

  // ========================= 예약하기 ======================== //

    // 입력 값 가져가기
    function changeInsertRec(e){
      setInsertRec({
        ...insertRec,
        [e.target.name]: e.target.value
      });
    };

    // 예약 등록
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    function regRec(){
      // 필수 값이 비어 있는지 확인
      if (!insertRec.recDetail) {
      alert('증상 입력 필요');
      return;
      }

      if(!insertRec.recDate){
        alert('날짜 및 시간이 선택되지 않았습니다.');
        return;
      }

      if(!isChecked || !isChecked2){
        alert('모든 동의사항에 동의시 예약이 가능합니다.');
        return;
      }

      const isReg = window.confirm(`예약하시겠습니까?`)

      if(isReg){
        axios.post('/rec/insertMainRec',insertRec)
      .then((res) => {
        alert('예약 완료');
        navigate(0);
      })
      .catch((error) => {console.log(error)})
      }
      else{}
      
    }
    

  // ========================= Time 컴포넌트 ======================== //

  function CustomTime({selectTime, setSelectTime}) {
    const time = [
      {text: '9:00 AM', value: 9},
      {text: '10:00 AM', value: 10},
      {text: '11:00 AM', value: 11},
      {text: '13:00 PM', value: 13},
      {text: '14:00 PM', value: 14},
      {text: '15:00 PM', value: 15},
      {text: '16:00 PM', value: 16},
      {text: '17:00 PM', value: 17}
    ]
    //const [selectedtime, setSelectedtime] = useState(null);

    const onChangeRadio = (e) => {

      const timeValue = Number(e.target.value);

      //alert(timeValue)
      setSelectTime(timeValue);
      //if (onChange) {
      //  onChange(timeValue);
      //}
    }
    
    return (
        <div className='time-div'>
          {
            time.map((time, i) => (
              <label key={i}>
                <input
                  type='radio'
                  name='time'
                  value={time.value}
                  onChange={onChangeRadio}
                  checked={selectTime == time.value}
                />
                <span className='time' 
                  style={{
                    border: selectTime == time.value ? '1px solid rgb(139, 156, 173)' : '1px solid lightgray',
                    backgroundColor: selectTime == time.value ? 'rgb(150, 174, 197)' : '#eeeeee',
                    color: selectTime == time.value ? 'white' : 'gray'
                  }}
                >
                  {time.text}
                </span>
              </label>
            ))
          }
        </div>
    );
  }

  // =========================== return ========================== //
  
  return (
    <div className='reservation'>
      <div>온라인예약</div>
      <div className='explain'>
        <div>√ 온라인 진료예약은 재진환자에 한합니다.</div>
        <ul>
          <li>초진 환자는 '간편예약' 또는 '내방접수'로 이용해주시기 바랍니다. </li>
        </ul>
        <div>√ 온라인 진료예약</div>
        <ul>
          <li><span>온라인 진료예약은 임시예약</span>으로, 담당자가 고객님께 전화드려서 예약시간을 조정하여 확정해 드립니다.</li>
          <li>온라인 진료예약은 원하시는 날짜/시간에 예약이 안될 수 있습니다. <br/>
            <span>예약이후 '예약확인 전화/문자'를 받지 못하신 경우에도 예약이 되지 않는 점 참고 부탁드리겠습니다.</span></li>
          <li>홈페이지에서는 '홈페이지 예약접수'와 '예약완료내역' 확인만 가능하므로, <br /> 이전 병원예약 내역은 본원 원무팀 (☎052-123-4567) 으로 문의 바랍니다. </li>
          <li>온라인 진료예약 변경 시,진료 예약일 하루 전까지 예약하신 진료과
          또는 예약담당자에게 전화로 변경이나 취소하시기 바랍니다. </li>
        </ul>
      </div>

      <div className='act'>
        <div className='act_1'>
          <div className='reserv-title'>진료과 선택</div>
          <div className='reserv-part'>
            {
              partList.map((part, i) =>{
                return(
                  <div name='partNum' className={`part ${part.partNum === partNum ? 'selected' : ''}`} key={i} value={part.partNum}
                    onClick={() =>{setPartNum(part.partNum)}}>{part.partName}</div>
                );
              })
            }
          </div>
        </div>
        <div className='act_2'>
          <div className='reserv-title'>의료진 선택</div>
          <div className='reserv-doctor'>
            {
              doctor.map((doc,i) => {
                return(
                  <div key={i} name='staffNum' className={`doctor ${doc.staffNum === doctorNum ? 'selected' : ''}`}
                    onClick={()=>selectDoctor(doc.staffNum)}>
                    <div className='img'><img src={'http://localhost:8080/images/doctor.jpg'} /></div>
                    <div className='doctorInfo'>
                      <div>{doc.part.partName}</div>
                      <div>{doc.staffName}</div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        {/* css reservCalendar.css 파일에 있음 */}
        <div className='act_3'>
          <div className='reserv-title'>예약날짜/시간 선택</div>
          <div>
            <div className='reservCalendar'>
              <DatePicker inline  selected={selectDate} value={selectDate} 
                onChange={(date) =>{handleDateChange(date)}}
                filterDate={isDay} dayClassName={isDay}/>
            </div>
            
            <div className='reservTime'>
              <CustomTime selectTime={selectTime} setSelectTime={setSelectTime}/>
            </div>

            <div className='reservInfo'>
              <div>예약자 : <span>{loginInfo.memName}</span></div>
              <div>증상 <br/>
                <textarea type='text' className='form area' name='recDetail'
                    value={insertRec.recDetail} onChange={(e) => {changeInsertRec(e)}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='privacyAgree'>
        <div className='reserv-title'>개인정보처리방침</div>
      </div>

      <PrivacyInfo />

      <div className="agreeChk02">
        <label htmlFor="chk2">만 14세 미만 <span className="point07">아동 또는 진료 예약 대리인의 경우</span> : 법적대리인여부</label><input type="checkbox" id="chk2" name="chkAgree2" className="inputChk" value="Y" title="만 14세 미만 아동 또는 진료 예약 대리인의 경우 법적대리인 여부에 동의합니다." onChange={(e) =>{setIsChecked(e.target.checked)}}/>
      </div>
      <div className="agreeChk02 mgt20">
        <label htmlFor="chk"> 개인정보보호정책을 읽었으며 내용에 동의합니다.</label><input type="checkbox" id="chk" name="chkAgree"   
        className="inputChk" title="개인정보보호정책을 읽었으며 내용에 동의합니다."
          onChange={(e) =>{setIsChecked2(e.target.checked)}}/>
      </div>

      <button className='addChartBtn' onClick={() =>{regRec()}}>예 약</button>
    </div>
  )
}

export default Reservation