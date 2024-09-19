import React from 'react'
import './Reservation.css'


const PrivacyInfo = () => {
  return (
    <div className='privacyAgree'>
      <div className='clauseWrap'>
        <div className="S_ContBox">
          <div className="S_Cont">
            <div className="cBox_top">
              <p>'그린카페병원은(이하 '본원' 이라 함) 귀하의 개인정보보호를 매우 중요시하며, 『개인정보보호법』을 준수하고 있습니다. 본원은 개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.이 개인정보처리방침의 순서는 다음과 같습니다. </p>
        
              <table className="label_style">
                <colgroup>
                  <col width="33.33%;" />
                  <col width="33.33%;" />
                  <col width="33.33%;" />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan="3" scope="col">【주요 개인정보 처리 표시(라벨링)】</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="http://localhost:8080/images/img_label01.jpg" alt="일반 개인정보 수집" /><br/>
                      <span>
                        <strong>일반 개인정보 수집</strong><br/>
                        성명, 주소, 연락처,<br/>진료기록 등 수집
                      </span>
                    </td>
                    <td>
                      <img src="http://localhost:8080/images/img_label02.jpg" alt="주민등록번호"/><br/>
                      <span>
                        <strong>주민등록번호</strong><br/>
                        주민등록번호
                      </span>
                    </td>
                    <td>
                      <img src="http://localhost:8080/images/img_label03.jpg" alt="개인정보의 제공"/><br/>
                      <span>
                        <strong>개인정보의 제공</strong><br/>
                        건강보험심사평가원,<br/>근로복지공단 등
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="http://localhost:8080/images/img_label04.jpg" alt="처리목적"/><br/>
                      <span>
                        <strong>처리목적</strong><br/>
                        진료서비스와 청구,<br/>수납 및 환급 등의<br/>원무서비스 제공 등
                      </span>
                    </td>
                    <td>
                      <img src="http://localhost:8080/images/img_label05.jpg" alt="처리위탁"/><br/>
                      <span>
                        <strong>처리위탁</strong><br/>
                        위탁검사, 본원 관리 시스템 운영<br/>및 유지보수,<br/>PACS 유지보수 등
                      </span>
                    </td>
                    <td>
                      <img src="http://localhost:8080/images/img_label06.jpg" alt="고충처리부서"/><br/>
                      <span>
                        <strong>고충처리부서</strong><br/>
                        기획총무팀 052-610-9199<br/>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
        
              <div className="cBlist">
                <ol>
                      <li>1. 수집하는 개인정보의 항목 및 수집방법</li>
                      <li>2. 개인정보의 수집 및 이용목적</li>
                      <li>3. 개인정보의 보유 및 이용기간 및 파기절차 및 파기방법</li>
                      <li>4. 이용자 및 법정대리인의 권리와 그 행사방법</li>
                      <li>5. 개인정보의 제공 및 공유</li>
                      <li>6. 개인정보의 위탁</li>
                      <li>7. 개인정보 보호책임자</li>
                      <li>8. 개인정보의 안전성 확보조치</li>
                      <li>9. 정책 변경에 따른 공지의무</li>                    
                  </ol>
              </div>
            </div>
            <div className="cBox">
                <p className="txtTitSt cBtit">수집하는 개인정보의 항목 및 수집방법<img src="http://localhost:8080/images/img_label01.jpg" alt="일반 개인정보 수집"/><img src="http://localhost:8080/images/img_label02.jpg" alt="주민등록번호"/></p>
                <p>본원은 진료를 위해 의료법에 의해 명시된 최소한의 개인정보만을 수집합니다. <br/>귀하가 본원의 진료 서비스를 이용하기 위해 작성하는 진료카드와 진료결과에 대한 기록을 관리합니다.</p>
                <p>- 수집항목 : 성명, 주민등록번호, 주소, 연락처, 진료기록</p>
                <p className="cBold">※ 의료법에 의해 고유식별정보 및 진료정보를 의무적으로 보유 하여야 함(별도 동의 불필요) </p>
            </div>
            <div className="cBox">
                <p className="txtTitSt cBtit">개인정보의 수집 및 이용목적<img src="http://localhost:8080/images/img_label04.jpg" alt="처리목적" /></p>
                <p>본원은 수집한 개인정보를 진단 및 치료를 위한 진료서비스와 청구, 수납 및 환급 등의 원무 서비스 제공 목적으로만 사용하며 이용 목적이 변경될 시에는 사전 동의를 구할 것입니다. </p>
            </div>            
            <div className="cBox">
                <p className="txtTitSt cBtit">개인정보의 보유 및 이용기간 및 파기절차 및 파기방법<img src="http://localhost:8080/images/img_label04.jpg" alt="처리목적" /></p>
                <p>본원은 의료법에서 정한 보유기간 동안 개인정보를 보유하며 그 이후에는 개인정보를 지체 없이 파기합니다. </p>
                <p>- 보유기간 : 진료기록부 10년</p>
                <p>- 파기절차 : 법정 보유기간 후 파기방법에 의하여 즉시 파기</p>
                <p>※ 수집목적이 달성된 후에도 보존할 필요성이 있는 경우에는 보유기간을 연장할 수 있습니다.</p>
                <p>- 파기방법 : 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제 하고 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기</p>
            </div>            
            <div className="cBox">
                <p className="txtTitSt cBtit">이용자 및 법정대리인의 권리와 그 행사방법<img src="http://localhost:8080/images/img_label04.jpg" alt="처리목적" /></p>
                <p>이용자 및 법정대리인은 개인정보와 관련하여 전화, 서면 등을 이용하여 본원에 개인정보 열람 등의 권리를 행사할 수 있으며, 본원은 지체 없이 필요한 조치를 합니다.</p>
                <p>※ 법에 의해 보관이 의무화된 개인정보는 요청이 있더라도 보관기간내에 수정·삭제할 수 없습니다. </p>
            </div>            
            <div className="cBox">
                <p className="txtTitSt cBtit">개인정보의 제3자 제공<img src="http://localhost:8080/images/img_label02.jpg" alt="개인정보의 제공" /></p>
                <p>본원은 국민건강보험법에 의거 건강보험심사평가원/근로복지공단 에 요양급여비용 청구를 위해 진료 기록을 제출합니다. </p>
                <p className="cBold">※ 법에 의해 의무적으로 제출하는 사항이므로 별도의 제공 동의 불필요 </p>
            </div>   
            <div className="cBox">
                <p className="txtTitSt cBtit">개인정보 처리의 위탁<img src="http://localhost:8080/images/img_label05.jpg" alt="처리위탁" /></p>
                <p>본원은 개인정보의 관리시스템의 관리를 위해 다음의 회사에 개인정보를 위탁하고 있습니다. </p>
                <ol>
                    <li>- 병원정보시스템(S/W) : (주)비트컴퓨터</li>
                    <li>- Data Base 유지보수 : 정원앤시스</li>
                    <li>- 본원 관리 시스템 운영 및 유지보수(H/W) : 정원앤시스</li>
                    <li>- PACS 유지보수 : 인피니트사</li>
                    <li>- 위탁검사: 삼광의료재단, 씨젠의료재단</li>
                    <li>- 건강검진: 희원, 좋은삼선병원</li>
                    <li>- 홈페이지 관리 : (주)어댑티브, 지오유</li>           	
                    <li>- 병원보 발송 : 글꼴</li>           	
                    <li>- 의료영상전송 : 휴마니타스(주)</li>           	
                </ol>
            </div>                                             
            <div className="cBox">
              <p className="txtTitSt cBtit">개인정보 보호책임자<img src="http://localhost:8080/images/img_label06.jpg" alt="고충처리부서"/><img src="http://localhost:8080/images/img_label08.jpg" alt="개인정보 보호책임자"/></p>
              <table className="tableStA" summary="개인정보 보호책임자">
                <caption>개인정보 보호책임자</caption>
                  <colgroup>
                    <col width="18%"/>
                    <col width="18%"/>
                    <col width="18%"/>
                    <col width="18%"/>
                    <col width="*"/>
                  </colgroup>
                  <thead>
                      <tr>
                          <th scope="col">이름</th>
                          <th scope="col">직위</th>
                          <th scope="col">소속</th>
                          <th scope="col">전화번호</th>
                          <th scope="col">메일</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>문나겸</td>
                          <td>사무국장</td>
                          <td>그린카페병원</td>
                          <td>610-9197</td>
                          <td> mhjpage@naver.com </td>
                      </tr>
                    <tr>
                        <td>백수민</td>
                          <td>사원</td>
                          <td>그린카페병원</td>
                          <td>610-9199</td>
                          <td>gg223113@naver.com</td>
                      </tr>                        
                  </tbody>
              </table>
            </div>            
            <div className="cBox">
                <p className="txtTitSt cBtit">개인정보의 안전성 확보조치<img src="http://localhost:8080/images/img_label08.jpg" alt="개인정보 보호책임자" /></p>
                <p>본원은 이용자의 개인정보보호를 위한 기술적 대책으로서 여러 보안장치를 마련하고 있습니다.
                이용자께서 제공하신 모든 정보는 방화벽 등 보안장비에 의해 안전하게 보호/관리되고 있습니다.
                또한 본원은 이용자의 개인정보보호를 위한 관리적 대책으로서 이용자의 개인정보에 대한 접근 및 관리에 필요한 절차를 마련하고, 이용자의 개인정보를 처리하는 인원을 최소한으로 제한하여 지속적인 보안교육을 실시하고 있습니다. 또한 개인정보를 처리하는 시스템의 사용자를 지정하여 사용자 비밀번호를 부여하고 이를 정기적으로 갱신하겠습니다.  </p>
            </div>            
            <div className="cBox">
                <p className="txtTitSt cBtit">정책 변경에 따른 공지의무<img src="http://localhost:8080/images/img_label07.jpg" alt="개인정보 처리방침변경" /></p>
                <p>이 개인정보처리방침은 2012년 1월 1일에 제정되었으며 법령ㆍ정책 또는 보안기술의 변경에 따라 내용의 추가ㆍ삭제 및 수정이 있을 시에는 변경되는 개인정보처리방침을 시행하기 최소 7일전에 본원 홈페이지를 통해 변경이유 및 내용 등을 공지하도록 하겠습니다.  </p>
                <p>공고일자 : 2015년 12월 30일<br /> 시행일자 : 2023년 11월</p>
            </div>                                 
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyInfo