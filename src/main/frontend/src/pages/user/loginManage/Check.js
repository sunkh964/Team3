import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Check = () => {

  const navigate = useNavigate();
  
  // 체크박스 상태를 관리하는 state 변수
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState({
    term1: false,
    term2: false,
    term3: false
  });

  // "모두 체크" 버튼 클릭 시 호출되는 함수
  const handleCheckAll = () => {
    const newAgreeTerms = {
      term1: true,
      term2: true,
      term3: true
    };
    setAgreeTerms(newAgreeTerms);
    setIsAllChecked(true);
  };

  // 개별 체크박스 변경 시 호출되는 함수
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAgreeTerms(prevState => ({
      ...prevState,
      [name]: checked
    }));

    // 모든 체크박스가 체크되어 있으면 "모두 체크" 상태를 true로 설정
    if (Object.values(agreeTerms).every(value => value === true) && checked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  // "다음 페이지" 버튼 클릭 시 호출되는 함수
  const handleNextPage = () => {
    // 모든 체크박스가 체크되어 있는지 확인
    if (Object.values(agreeTerms).every(value => value === true)) {
      navigate('/join'); // 다음 페이지로 이동
    } else {
      alert('모든 항목에 동의해야 합니다.');
    }
  };

  return (
    <div className='check-body'>
      <span className='check-span'>이용 및 개인 동의</span>
      <div className='check-div1'>
        이용목적 <br/>
  홈페이지 회원관리, 진료예약 및 증명서 발급 등 각종 서비스 <br/>
  
  수집 항목<br/>
  -필수항목:
  
  성명, 성별, 국적, 생년월일, 자택주소, ID/비밀번호, e-mail, 휴대전화번호, CI, DI
  (만14세 미만 아동의 경우 법정대리인 정보(성명, 생년월일, 휴대전화번호, CI, DI, 환자와의 관계),환아 주민등록번호)<br/>
  (진료회원의 경우 주민등록번호 또는 진찰권번호(환자번호))<br/>
  (직원의 경우 사번, 주민등록번호)
  
  -선택항목:
  
  네이버 아이디<br/>
  보유 및 이용기간<br/>
  홈페이지 회원가입 탈퇴시까지 혹은 회원가입 시 선택한 보유기간(2/3/5년)까지
  단, 진료서비스 제공을 위하여 수집된 경우 의료법 기준에 준함(의료법 시행규칙 제15조에 명시된 기간)
      </div>
      <div className="checkbox-container">
        <label className='dong'>
          <input 
            type="checkbox" 
            name="term1" 
            checked={agreeTerms.term1} 
            onChange={handleCheckboxChange} 
          />
          이용 약관 동의
        </label>
        <div className='check-div1'>
        이 개인정보 처리 방침(이하 "방침")은 [그린카페병원] (이하 "그린카페병원")이 수집하는 개인정보의 처리에 관한 사항을 설명합니다. <br/>

1. 개인정보 수집 항목<br/>
병원은 다음과 같은 개인정보를 수집할 수 있습니다:<br/>

식별 정보: 성명, 생년월일, 성별
연락처 정보: 전화번호, 이메일 주소
주소 정보: 거주 주소
의료 정보: 진료 기록, 검사 결과, 치료 정보
결제 정보: 신용카드 정보, 보험 정보
2. 개인정보 수집 방법<br/>
병원은 다음과 같은 방법으로 개인정보를 수집합니다:

온라인: 웹사이트, 모바일 애플리케이션
오프라인: 병원 방문 시 직접 제공
전화: 예약, 문의 시
3. 개인정보의 이용 목적
병원은 수집된 개인정보를 다음과 같은 목적으로 이용합니다:

의료 서비스 제공: 진료, 검사, 치료 및 상담<br/>
예약 관리: 진료 예약, 예약 확인
청구 및 결제: 비용 청구, 결제 처리
고객 지원: 문의, 불만 처리
정보 제공: 병원 서비스 및 이벤트 관련 정보 제공
4. 개인정보의 보유 및 이용 기간<br/>
보유 기간: 개인정보는 법령에 따른 보관 기간 동안 보유합니다.
파기: 보유 기간 경과 후 또는 처리 목적 달성 후, 개인정보는 안전하게 파기합니다.
5. 개인정보의 제3자 제공<br/>
병원은 다음과 같은 경우에 개인정보를 제3자에게 제공할 수 있습니다:

법적 요구: 법령에 의한 요구에 따라 제공
계약 이행: 의료 서비스 제공을 위한 제휴기관, 보험사 등
동의: 환자의 사전 동의가 있는 경우
6. 개인정보의 안전성 확보 조치<br/>
병원은 개인정보 보호를 위해 다음과 같은 조치를 취합니다:

기술적 조치: 암호화, 방화벽, 침입 탐지 시스템
관리적 조치: 접근 권한 관리, 정기적인 보안 교육
물리적 조치: 데이터 센터 보안, 문서 보관 관리
7. 개인정보 처리 위탁<br/>
병원은 서비스 제공을 위해 개인정보 처리 업무를 외부 업체에 위탁할 수 있습니다. 위탁업체는 개인정보 보호를 위해 적절한 조치를 취해야 합니다. 위탁 내용 및 업체는 병원 웹사이트에 공지합니다.
      </div>
        <label>
          <input 
            type="checkbox" 
            name="term2" 
            checked={agreeTerms.term2} 
            onChange={handleCheckboxChange} 
          />
          개인정보 처리방침 동의
        </label>
      </div>
      <div className='check-btn'>
        <button type='button' class="btn-6"  onClick={handleCheckAll}><span>모두 체크</span></button>
        <button type='button' class="btn-6" onClick={handleNextPage}><span>다음 페이지</span></button>
      </div>
    </div>
  )
}

export default Check