import axios from 'axios';
import './ReservSelect.css'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../../../common/Modal';

const ReservSelect = () => {
  const navigate = useNavigate();

  

  // 로그인 정보 확인
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginInfo = sessionLoginInfo ? JSON.parse(sessionLoginInfo) : null;

  // 회원의 예약 리스트 저장
  const [resList, setResList] = useState([]);

  console.log(resList);

  useEffect(()=>{
    axios.get(`/rec/selectIdRec/${loginInfo.patieNum}`)
    .then((res) =>{
      setResList(res.data);
    })
    .catch((error) =>{console.log(error);})
  },[]);

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

// 수정 쿼리

  // 회원 예약 상세
  const [resDetail, setResDetail] = useState({});
  const [doctor, setDoctor] = useState([]);

  // 수정쿼리 실행 시 빈 값을 채울 데이터
  const [updateDetail, setUpdateDetail] = useState({
    recNum : '',
    staffNum : '',
    recDate : '',
    recDetail : ''
  })
  function changeUpdateRes(e){
    setUpdateDetail({
      ...updateDetail,
      [e.target.name] : e.target.value
    });
  }
  
// ================== 모달관련 내용 ===================

  // 수정버튼 클릭시 화면에 보여지는 모달창의 상태
  const [updateModal, setUpdateModal] = useState(false);
  const [modifyActive, setModifyActive] = useState(false);

  // 수정 버튼 클릭 시 모달창 활성화
  function ResSelUpdate(recNum,partNum){

    setModifyActive(modifyActive ? false : true);

    axios.all([
      axios.get(`/rec/getRecInfo/${recNum}`)
      ,  axios.get(`/staff/selectStaffName/${partNum}`)
    ])
    .then(axios.spread((res1, res2)=>{
      setResDetail(res1.data);
      
      setDoctor(res2.data);
      // 모달창 상태 보이게 변경
      setUpdateModal(true);

      //수정
      setUpdateDetail({
        ...updateDetail,
        recNum : recNum,
        staffNum : res1.data.staffNum,
        recDate : res1.data.recDate,
        recDetail : res1.data.recDetail
      })
    }))
    .catch((error)=>{console.log(error)});

    // // 예약 상세보기 조회
    // axios.get(`/rec/getRecInfo/${recNum}`)
    //   .then((res)=>{
    //     setResDetail(res.data);
    //     console.log(res.data);
    //     // 모달창 상태 보이게 변경
    //     setUpdateModal(true);
    //   })
    //   .catch((error) => {console.log(error)})
  }

  //login 쿼리 실행 후 띄는 모달 안의 내용
  function drawModalContent(){

    return (
      <>
        {
          <div className='resModal'>
            <div><span>[ {loginInfo.memName} ]</span> 님</div>
            <table className='resModal-table'>
              <tr>
                <td>진료과</td>
                <td>{resDetail.staffVO.part.partName}</td>
                <td className='dam'>담당의료진</td>
                <td>
                  <select className='modaleForm'
                          name='staffNum' 
                          onChange={(e)=>{changeUpdateRes(e)}} 
                          value={updateDetail.staffNum}>
                    {
                      doctor.map((doc,i)=>{
                        return(
                          <option key={i} value={doc.staffNum}>{doc.staffName}</option>
                        );
                      })
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <td>예약시간</td>
                <td colSpan={3}>
                  <input name='recDate' 
                      className='modaleForm' 
                      type='datetime-local' 
                      value={updateDetail.recDate}
                      onChange={(e)=>{changeUpdateRes(e)}}/>
                </td>
              </tr>
              <tr>
                <td>증상</td>
                <td colSpan={3}>
                  <textarea name='recDetail' 
                          onChange={(e)=>{changeUpdateRes(e)}}>
                    {resDetail.recDetail}
                  </textarea>
                </td>
              </tr>
            </table>
          </div>
        }
      </>
    );
  }
  // 일정 추가 모달 footerContent 내용
  function drawFooterContent() {}

  // 수정 실행(모달창에서 확인 버튼 클릭 시)
  function handleBtn() {
    axios.put('/rec/updateIdRec',updateDetail)
    .then((res) => {
      console.log("수정 완료")
      navigate(0);
  })
      .catch((error) => {console.log(error)});
  }

// =================== return =======================

  return (
    <div className='resSelect'>
      <div>예약조회</div>
      <div className='explain'>
        <div>√ 예약내역 참고사항</div>
        <ul>
          <li><span>온라인으로 진행하신 진료예약은 임시예약</span>으로, 담당자가 고객님께 전화드려 예약시간을 조정한 후 확정해 드리므로, <br/>
          <span>'예약확인 전화/문자'를 받지 못하신 경우 지정하신 날짜/시간이 변경될 수 있는 점 </span>
          참고 부탁드리겠습니다.
          </li>
          <li>예약 확정 이후 진료예약 변경 시, 위 사항과 동일하게 연락을 드릴 예정입니다.</li>
        </ul>
        <div>√ 예약 문의 (☎052-123-4567)</div>
        <ul>
          <li>홈페이지에서는 '홈페이지 예약접수'와 '예약완료내역' 확인만 가능하므로, <br /> 이전 병원예약 내역은 본원 원무팀 (☎052-123-4567) 으로 문의 바랍니다. </li>
          <li>이외 관련 문의사항이 있으신 경우 또한 본원 원무팀으로 연락 바랍니다. </li>
        </ul>
      </div>
      <div className='resSelect-list'>
        <div><b>[{loginInfo.memName}]</b> 님 예약 내역</div>
        {
        resList.map((res,i)=>{
          return(
            <div key={i} className='resSelectTable'>
              <table className='resSelect-table'>
                <colgroup>
                  <col width='5%' />
                  <col width='30%' />
                  <col width='15%' />
                  <col width='30%' />
                  <col width='10%' />
                  <col width='10%' />
                </colgroup>
                <tr>
                  <td rowSpan={2}>{i+1}</td>
                  <td rowSpan={2}>{res.recDate}</td>
                  <td>{res.staffVO.part.partName}</td>
                  <td rowSpan={2}>{res.recDetail}</td>
                  <td rowSpan={2}>
                    <button className='resSelBtn' onClick={()=>{ResSelUpdate(res.recNum, res.staffVO.part.partNum)}}>수정</button></td>
                  <td rowSpan={2}>
                    <button className='resSelBtn1' onClick={()=>{delRes(res.recNum)}}>삭제</button></td>
                </tr>
                <tr>
                  <td>{res.staffVO.staffName}</td>
                </tr>
              </table>
            </div>
          );
        })
      }
      </div>

      {/* ResSelUpdate 실행 후 띄는 모달 */}
      {
        updateModal
        ?
        <Modal content={drawModalContent} 
                setIsShow={setUpdateModal}
                setModifyActive={setModifyActive}
                clickCloseBtn={handleBtn}
                footerContent={drawFooterContent}/>
        :
        null
      }
     
    </div>
  )
}

export default ReservSelect