package com.green.Team3.member.service;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.patie.vo.PatieVO;

import java.util.List;

public interface MemberService {
//    회원가입
    void join(MemberVO memberVO);

//회원가입 환자 까지
    void join1(MemberVO memberVO);


//    아이디 중복
    boolean isDuplicateId(String memid);

//    로그인
    MemberVO login(MemberVO memberVO);

//    마이페이지 개인정보 수정화면 띄우는
    MemberVO getInfo(String memId);

//    개인정보 수정하기
    void update(MemberVO memberVO);
//    당일 예약 환자 기본 정보
    MemberVO insertChartMem(MemberVO memberVO);
}
