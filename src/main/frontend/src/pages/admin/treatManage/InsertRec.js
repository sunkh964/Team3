import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const InsertRec = () => {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const {patieNum} = useParams();
  const [patie, setPatie]=useState({})
  const [insertChart, setinsertChart] = useState({
    patieNum: patieNum,
    staffNum: 0,
    partNum: 0,
    recStatus:'',
    recDetail:''
  });

  // 진료부서 조회
  useEffect(() => {
    axios.get('/staff/getPart')
      .then((res) => {
        setParts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching parts:', error);
      });
  }, {});

  // 담당의 조회
  useEffect(() => {
    if (insertChart.partNum) {
      axios.get(`/staff/selectStaffName/${insertChart.partNum}`)
        .then((res) => {
          setStaffs(res.data);
        })
        .catch((error) => {
          console.error('Error fetching staffs:', error);
        });
    } else {
      setStaffs([]); 
    }
  }, [insertChart.partNum]);

  // 입력 값 변경 핸들러
  const changeValue = (e) => {
    setinsertChart({
      ...insertChart,
      [e.target.name]: e.target.value
    });
  };

  // 환자 기본정보
  useEffect(()=>{
    axios.get(`/patie/patieInfo/${patieNum}`)
    .then((res)=>{
    setPatie(res.data)
    console.log(res.data)
    })

  },[])

 // 환자 및 진료 정보 등록
  const insertChartRes = () => {
  axios.post('/rec/insertRec', insertChart)
  .then((res) => {
    alert('등록되었습니다.')
    navigate('/admin/chart')
  }).catch((error) => {console.error(error);});
};


  return (
    <div className='addChartBack'>
      <div className='addChart'>
        <div className='topTitle'>{patie.patieName} 님 진료 정보 추가</div>
        <div className='addTitle'>환자 기본 정보</div>
        <div className='addContent'>
          <span>이름 : </span>
          <span> {patie.patieName} </span>
          <div>
            <span>주민등록번호 :  </span>
            <span> {patie.patieBirth} </span>
          </div>
        </div>
        <div className='addContent'>
          <span>연락처 :</span>
          <span> {patie.patieTel} </span>
        <div className='cM'>
          <span>성별 :</span>
          <span> {patie.patieGen} </span>
        </div>
        </div>
        <div className='addContent'>
          <span>주소 :</span>
          <span> {patie.patieAddr} </span>
        </div>

        <div className='addTitle title2'>진료 정보</div>
        <div className='addContent'>
          <div>
            <span>진료부서 :</span>
            <select name='partNum' value={insertChart.partNum} onChange={changeValue}>
              <option value="">진료부서 선택</option>
              {parts.map((part, i) => (
                <option key={i} value={part.partNum}>
                  {part.partName}
                </option>
              ))}
            </select>
          </div>
          <div className='cM'>
            <span>담당의 :</span>
            <select name='staffNum' value={insertChart.staffNum} onChange={changeValue}>
              <option value="">담당의 선택</option>
              {staffs.map((staff, i) => (
                <option key={i} value={staff.staffNum}>
                  {staff.staffName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='addTitle'>환자 세부사항</div>
        <div className='addContent'>
        </div>
        <div className='addContent'>
          <span> 증상 :</span>
          <input type='text' name='recDetail' onChange={changeValue} className='recDetail' />
        </div>

        <button className='addChartBtn' onClick={insertChartRes}>진료 정보 등록</button>
      </div>
    </div>
  );
}

export default InsertRec