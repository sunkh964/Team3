import React, { useEffect, useState } from 'react'
import './Reservation.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DateSelect from '../../../common/DateSelect';
import DatePicker from 'react-datepicker';

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
          <div>
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
          <div>
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
          <div>
            <div className='reserv-title'>예약날짜/시간 선택</div>
            <div>
              <div>
                <DatePicker inline />
                
              </div>
              <div>
                <DatePicker showTimeSelect={true} showTimeSelectOnly inline/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation