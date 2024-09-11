import React, { useEffect, useState } from 'react'
import './Reservation.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DateSelect from '../../../common/DateSelect';
import DatePicker from 'react-datepicker';
import './reservCalendar.css'
import { setHours } from 'date-fns';
import styled from 'styled-components';
import CustomRadio from './CustomRadio';

const Reservation = () => {
  const {partNum: initialPartNum} = useParams();
  const {staffNum: initialDoctorNum} = useParams();

  // 부서목록 저장
  const [partList, setPartList] = useState([]);

  // 의료진 저장
  const [doctor, setDoctor] = useState([]);

  // 현재 선택된 부서 번호
  const [partNum, setPartNum] = useState(initialPartNum || '');

  // 선택된 의료진 번호
  const [doctorNum, setDoctorNum] = useState(initialDoctorNum || '');

  // 시간
  const [time, setTime] = useState([
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ]);

  


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
      setDoctor([]); // `partNum`이 없는 경우 직원 목록 초기화
    }
  },[partNum]);

  // ================== Time ================== //

  function CustomTime() {
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
    const [selectedtime, setSelectedtime] = useState(null);
    const onChangeRadio = (e) => {
      console.log(e.target.value);
      setSelectedtime(Number(e.target.value));
    }
    
    return (
        <div className='time-div'>
          {
            time.map((time, i) => (
              // const idx = selectedtime >= 13 ? i+9 : i+10;
              <label key={i}>
                <input
                  type='radio'
                  name='time'
                  value={time.value}
                  onChange={(e)=>{onChangeRadio(e)}}
                  checked={
                    selectedtime >= 13 ? i+10 : i+9 === selectedtime}
                />
                <span className='time' 
                  style={{
                    border: (selectedtime >= 13 ? i+10 : i+9) === selectedtime ? '1px solid lightslategray' : '1px solid lightgray',
                    backgroundColor: (selectedtime >= 13 ? i+10 : i+9) === selectedtime ? 'lightslategray' : '#eeeeee',
                    color: (selectedtime >= 13 ? i+10 : i+9) === selectedtime ? 'white' : 'gray'
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
  
  return (
    <div className='reserv-container'>
      <div id='sidebar'>
        <div>진료예약</div>
        <ul>
          <li>예약하기</li>
          <li>예약조회</li>
          <li>간편예약</li>
        </ul>
      </div>

      <div className='reserv-content'>
        <div className='explain'>
          <div>온라인예약</div>
          <div>어쩌구</div>
        </div>
  
        <div className='act'>
          <div className='act_1'>
            <div className='reserv-title'>진료과 선택</div>
            <div className='reserv-part'>
              {
                partList.map((part, i) =>{
                  return(
                    <div className={`part ${part.partNum === partNum ? 'selected' : ''}`} key={i} value={part.partNum}
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
                    <div className={`doctor ${doc.staffNum === doctorNum ? 'selected' : ''}`}
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
          <div className='act_3'>
            <div className='reserv-title'>예약날짜/시간 선택</div>
            <div>
              <div className='reservCalendar'>
                <DatePicker inline />
              </div>
              
              <div className='reservTime'>
                <CustomTime/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation