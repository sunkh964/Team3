import React, { useEffect, useState } from 'react';
import './Reserv_staff.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Reserv_staff = () => {
  const navigate = useNavigate();

  const [todayRecList, setTodayRecList] = useState([]);
  const [allRecList, setAllRecList] = useState([]);
  const [recDetail, setRecDetail] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const { recNum } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [selectedPartNum, setSelectedPartNum] = useState('');


  // 의료진 조회
  useEffect(() => {
    if (selectedPartNum) {
      axios.get(`/staff/selectStaffName/${selectedPartNum}`)
        .then((res) => {
          setDoctor(res.data);
        })
        .catch((error) => { console.log(error) });
    } else {
      setDoctor([]);
    }
  }, [selectedPartNum]);

  useEffect(() => {
    axios.get('/rec/selectTodayRec')
      .then((res) => {
        setTodayRecList(res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    axios.get('/rec/selectAllRec')
      .then((res) => {
        setAllRecList(res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  // 예약 상세정보 조회
  function getRecDetail(recNum) {
    axios.get(`/rec/getRecInfo/${recNum}`)
      .then((res) => {
        setRecDetail(res.data);
        setSelectedPartNum(res.data.staffVO.part.partNum); // 상세보기 부서 번호 저장
        //수정
        setUpdateInfo({
          ...updateInfo,
          recNum: recNum,
          part: res.data.staffVO.part.partNum,
          staffNum: res.data.staffVO.staffNum,
          recDate: res.data.recDate,
          recDetail: res.data.recDetail
        });
      })
      .catch((error) => { console.log(error) });
  }
// ================== 수정 ===================
  // 수정쿼리 실행 시 빈 값을 채울 데이터
  const [updateInfo, setUpdateInfo] = useState({
    recNum: recNum,
    part: '',
    staffNum: '',
    recDate: '',
    recDetail: ''
  });

  function changeUpdateRes(e) {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value
    });
  }

  // 예약정보 수정 등록
  function updateRec(){
    const isUpdate = window.confirm('수정 하시겠습니까');
    if(isUpdate){
      console.log(updateInfo)
      axios.put('/rec/updateIdRec',updateInfo)
      .then((res)=>{
        alert('수정 완료')
        navigate(0)
      })
      .catch((error) => {console.log(error)})
    }
  }


  // 삭제
  function delRes(recNum){
    const isConfirm = window.confirm(` 예약을 삭제하시겠습니까`);

    if (isConfirm){
      axios.delete(`/rec/delIdRec/${recNum}`)
    .then((res) => {
      alert(`삭제 완료`);
      navigate(0)
    })
    .catch((error) =>{console.log(error)})
    }
    else{ navigate(0) }
    
  }

  return (
    <div className='reserv-staff'>
      <div className='title'>예약관리</div>
      <div className='reservStaff-content'>
        <div className='content-up'>
          <div className='reservList'>
            <div className='resList-title'>금일 예약 리스트 [ <span>{new Date().toLocaleDateString('ko-KR')}</span> ]</div>
            <div className='resUserList'>
              <table className='resUserList-table'>
                <colgroup>
                  <col width='10%' />
                  <col width='20%' />
                  <col width='16%' />
                  <col width='16%' />
                  <col width='16%' />
                  <col width='22%' />
                </colgroup>
                <thead>
                  <tr>
                    <td>No.</td>
                    <td>예약 시간</td>
                    <td>진료과</td>
                    <td>담당의료진</td>
                    <td>이름</td>
                    <td>생년월일</td>
                  </tr>
                </thead>
                <tbody>
                  {todayRecList.map((rec, i) => (
                    <tr key={i} onClick={() => { getRecDetail(rec.recNum); setSelectedRow(i); }} className={selectedRow === i ? 'highlight' : ''}>
                      <td>{i + 1}</td>
                      <td>{rec.recDate}</td>
                      <td>{rec.staffVO.part.partName}</td>
                      <td>{rec.staffVO.staffName}</td>
                      <td>{rec.patieVO.patieName}</td>
                      <td>{rec.patieVO.patieBirth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='updateReserv'>
            <div className='resList-title'>예약정보 수정/삭제</div>
            <table className='updateRes-table'>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tr>
                <td>이름</td>
                <td>: {recDetail.patieVO ? recDetail.patieVO.patieName : ''}</td>
                <td>생년월일</td>
                <td>: {recDetail.patieVO ? recDetail.patieVO.patieBirth : ''}</td>
              </tr>
              <tr>
                <td>진료부서</td>
                <td>: {recDetail.staffVO ? recDetail.staffVO.part.partName : ''}</td>
                <td>의료진</td>
                <td>
                  <select name='staffNum' 
                          onChange={(e) => { changeUpdateRes(e); 
                            setUpdateInfo((prev) => ({
                            ...prev,
                            staffNum: e.target.value  // updateInfo의 staffName 업데이트
                          }));
                        }} 
                        value={updateInfo.staffNum || ''}>
                    {
                      doctor.map((doc, i) => (
                        <option key={i} value={doc.staffNum}>{doc.staffName}</option>
                      ))
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <td>예약시간</td>
                <td><input name='recDate' type='datetime-local' value={updateInfo.recDate} onChange={(e) => changeUpdateRes({target: {name: 'recDate', value: e.target.value}})} /></td>
                <td>증상</td>
                <td><input name='recDetail' value={updateInfo.recDetail} onChange={(e) =>{changeUpdateRes(e)}} /></td>
              </tr>
            </table>
            <div className='resList-btn'>
              <button type='button' onClick={() => {updateRec()}}>수정</button>
              <button type='button' onClick={() => {delRes()}}>삭제</button>
            </div>
          </div>
        </div>
        <div className='content-down'>
          <div className='resList-title'>예약환자 리스트 ( <span>{allRecList.length}</span> )</div>
          <div className='resUserList'>
            <table className='resUserList-table'>
              <colgroup>
                <col width='10%' />
                <col width='20%' />
                <col width='16%' />
                <col width='16%' />
                <col width='16%' />
                <col width='22%' />
              </colgroup>
              <thead>
                <tr>
                  <td>No.</td>
                  <td>예약 시간</td>
                  <td>진료과</td>
                  <td>담당의료진</td>
                  <td>이름</td>
                  <td>생년월일</td>
                </tr>
              </thead>
              <tbody>
                {allRecList.map((rec, i) => (
                  <tr key={i} onClick={() => { getRecDetail(rec.recNum); setSelectedRow(i); }} className={selectedRow === i ? 'highlight' : ''}>
                    <td>{i + 1}</td>
                    <td>{rec.recDate}</td>
                    <td>{rec.staffVO.part.partName}</td>
                    <td>{rec.staffVO.staffName}</td>
                    <td>{rec.patieVO.patieName}</td>
                    <td>{rec.patieVO.patieBirth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserv_staff;
