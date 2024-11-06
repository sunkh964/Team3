# 병원 기능 관리 구현 팀 프로젝트
1. ✨[프로젝트 소개](#-프로젝트-소개)
2. 📌[주요 목표 및 구현 기능](#-주요-목표-및-구현-기능)
3. 🔧[기능 소개](#-기능-소개)
   - [예약하기](#예약하기)
   - [진료 관리](#진료-관리)
   - [일정 관리](#일정-관리)
   - [입고 관리](#입고-관리)
4. 👬[팀원 및 역할](#-팀원-및-역할)

</br>

## ✨ 프로젝트 소개
![그린카페1](https://github.com/user-attachments/assets/6417ee5b-882e-4532-9797-eb990afea87b)
React를 이용해 가상의 병원인 '그린카페병원'의 웹 사이트 구현

<br>

## 📌 주요 목표 및 구현 기능
1. **의료진 진료 스케줄 관리 기능** 구현
    - 환자 예약 기능
    - 진료 관리 기능(조회, 추가, 수정, 삭제)
    - 의료진 일정 캘린더(조회, 추가, 수정, 삭제)
2. [**대기 접수 서비스**](https://github.com/da9630jj/team3-app) 어플리케이션과 연동
3. **입고 프로세스** 구현 및 [**공급사 관점 웹 페이지**](https://github.com/sunkh964/Supplier)와 연동

</br>

- User 페이지
  - 회원 기능
     - - [x] 로그인
     - - [x] 회원가입
     - - [x] 게시글 관리
   - 진료 예약
      - - [x] 예약하기
      - - [x] 예약조회
- Admin 페이지
   - 진료 관리
      - - [x] 진료 목록
   - 환자 관리
      - - [x] 예약
   - 직원 일정 관리
      - - [x] 직원 스케줄 목록
   - 의료용품 관리
      - - [x] 입고 관리
      - - [x] 발주 관리
    - 병원장
      - - [x] 직원 관리

<br>

## 🔧 기능 소개
> 모든 GIF는 '새 탭에서 이미지 열기' 등의 방법으로 확대하여 열람하는 것을 추천 드립니다.

<br>

### 예약하기
![1_예약하기](https://github.com/user-attachments/assets/68a91094-3c6d-412b-a935-2aea70e4c0c4)
#### // 진료예약 페이지
 : 각 진료과에 대한 의료진 목록을 불러오고, 진료과 - 의료진 - 날짜 - 시간을 선택하고 증상을 입력한 후 </br>
   개인정보처리방침에 동의하게 되면 예약이 진행됩니다.
- _**부가기능**_
  ###### - 비회원의 경우, 로그인이 필요하다는 alert와 함께 로그인 페이지로의 이동
  ###### - 진료과 / 의료진의 경우, 상단 항목 자동 선택
  ###### - 날짜 / 시간 / 증상 / 개인정보처리방침 각 항목이 공란일 경우, 각 항목의 확인 요청 alert와 함께 예약 불가

<br>

### 진료 관리
| 환자 검색 | 진료 관리 |
| --- | --- |
| ![1_환자검색](https://github.com/user-attachments/assets/b970ff63-e409-4d5d-8f7c-62283a761379) | ![1_진료](https://github.com/user-attachments/assets/dba264e2-d1d2-4c73-973c-c0653adc127a) | 
| 재방문 환자 진료 등록 | 환자 진료 관리 (대기 → 진료)  |
| - 재방문 환자의 경우 기존 회원 데이터를 가져와, </br> &nbsp;관리자가 바로 진료 정보를 등록하며 **대기 접수** 진행 | - 환자 진료상태 </br> &nbsp; :  _"대기 / 진료 / 진료 완료 / 수납완료"_ 상태로 구분 </br> - 각 환자의 진료 상태에 따라, </br> &nbsp; **"대기 → 진료 → 진료 완료 → 수납" 진행** |


<br>

### 일정 관리

| 조회 | 추가 |
| --- | --- |
| ![1_일정 조회](https://github.com/user-attachments/assets/172d6c32-1230-4e7d-9e3f-8f19f2ef7b79) | ![1_일정 추가](https://github.com/user-attachments/assets/c1c0b194-d300-427f-96f6-6872d3064810) | 
| 로그인한 직원의 개인 일정과 진료 일정을 조회하여 캘린더에 그리고, 일정을 클릭하면 상세 내용을 확인할 수 있습니다. <br> 일정이 많은 경우 + more 버튼이 활성화 되어 모달을 통해 확인할 수 있습니다. | 캘린더의 날짜 칸을 클릭하면 해당 날짜를 기본값으로 받는 일정 추가 모달이 활성화됩니다. Datepicker 라이브러리를 이용해 날짜를 쉽게 선택할 수 있고, 우측 상단의 하루 종일 체크박스의 체크 여부에 따라 시간 선택 창이 활성화됩니다. |

| 수정 | 삭제 |
| --- | --- |
| ![1_일정 수정](https://github.com/user-attachments/assets/8760c3ff-8047-4099-95b7-db66a0b52e8e) | ![1_일정 삭제](https://github.com/user-attachments/assets/4b81db1e-e48c-42e9-b1fb-7fa0fec7f656) |
| 일정 상세 모달에서 수정 버튼을 누르면 활성화됩니다. 해당 이벤트의 내용을 기본값으로 전달받고, 이벤트 표시 색상, 날짜 및 시간, 제목, 내용을 수정할 수 있습니다. | 일정 상세 모달에서 삭제를 누르면 활성화됩니다. 해당 이벤트를 테이블에서 제거합니다. |

<br>

## 👬 팀원 및 역할
- [<u>노현경</u>](https://github.com/nohk1113) - 로그인/회원가입, 게시글, 1:1 문의하기
- [<u>한선경</u>](https://github.com/sunkh964)  - 메인 화면 UI 디자인, 예약하기, 병원장 전용 페이지
- [<u>정다영</u>](https://github.com/da9630jj) - 진료 목록, 환자 파트 목록, 입고·발주관리([3차 프로젝트](https://github.com/sunkh964/Supplier)에서 설명)
- [<u>이도원</u>](https://github.com/nubbp) - 직원 일정 관리
