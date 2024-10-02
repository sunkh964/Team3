  //유효성 검사 결과를 저장할 변수
  let resultArr = [
    false, //아이디
    false, //비번
    false, //이름
    false  //연락처
  ];

  let result_pw1 = false;
  let result_pw2 = false;

//valid_tag[0] : memId
//valid_tag[1] : memName
export const joinValidate = (newData, valid_tag, tagName) => {


  //id 값을 변경했으면 id 피드백만 띄움
  //pw 값을 변경했으면 pw 피드백만 띄움
  //name 값을 변경했으면 name 피드백만 띄움
  //tel 값을 변경했으면 tel 피드백만 띄움
  switch(tagName){
    case 'memId': 
      //id가 영문만 포함 + 4~12자리인지 검사하는 정규식
      const regex_memId = /^[a-z|A-Z]{4,12}$/;

      //id 유효성 검사
      //test() : 매개변수로 들어온 데이터가 조건에 부합하면 리턴 true
      if(regex_memId.test(newData.memId)){
        sendFeedbackMsg(valid_tag[0], '사용 가능한 아이디입니다.', 'good');
        resultArr[0] = true;
      }
      else{
        sendFeedbackMsg(valid_tag[0], '불가능한 아이디입니다.', 'error');
        resultArr[0] = false;
      }

      break;
    case 'memPw':
    case 'confirmPw': 
      //4 ~ 12글자, 영문 소문자 + 숫자 조합
      const regex_memPw = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/

      if(regex_memPw.test(newData.memPw)){
        sendFeedbackMsg(valid_tag[1], '사용 가능한 비번입니다', 'good');
        result_pw1 = true;
      }
      else{
        sendFeedbackMsg(valid_tag[1], '비번 형식을 확인하세요.', 'error');
        result_pw1 = false;
      }

      //입력한 두 비번이 다르면
      if(newData.memPw != newData.confirmPw){
        sendFeedbackMsg(valid_tag[2], '비밀번호가 일치하지 않습니다', 'error');
        result_pw2 = false;
      }
      else{
        sendFeedbackMsg(valid_tag[2], '', 'good');
        result_pw2 = true;
      }

      resultArr[1] = result_pw1 && result_pw2 ? true : false;

      break;
    case 'memName': 
      // 이름 값 유효성 검사
      //정규식 : 2~10 글자 + 한글만
      const regex_memName = /^[ㄱ-ㅎ|가-힣]{2,10}$/;

      //정규식에 충족하면
      if(regex_memName.test(newData.memName)){
        sendFeedbackMsg(valid_tag[3], '사용 가능한 이름입니다.', 'good');
        resultArr[2] = true;
      }
      else{
        sendFeedbackMsg(valid_tag[3], '사용 불가능한 이름입니다.', 'error');
        resultArr[2] = false;
      }

      break;
    case 'memTel': 
      //연락처 정규식
      const regex_memTel = /^\d{2,3}-\d{3,4}-\d{4}$/;
      
      if(regex_memTel.test(newData.memTel)){
        sendFeedbackMsg(valid_tag[4], '유효한 연락처입니다', 'good');
        resultArr[3] = true;
      }
      else{
        sendFeedbackMsg(valid_tag[4], '연락처를 확인하세요', 'error');
        resultArr[3] = false;
      }
      break;
  }

  //resultArr의 모든 데이터가 true일때만 리턴 true

  //배열에 매개변수로 전달된 데이터가 존해하면 리턴 true;
  //return !resultArr.includes(false);

  console.log(resultArr);

  for(const e of resultArr){//true true false true
    if(!e){
      return false;
    }
  }

  return true;

}


//유효성 결과 메세지를 띄우는 함수
function sendFeedbackMsg(feedbackTag, msg, type){
  feedbackTag.current.className = `feedback ${type}`;
  feedbackTag.current.textContent = msg;
}