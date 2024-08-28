package com.green.Team3.member.service;

import com.green.Team3.member.vo.MemberVO;

public interface MemberService {
//    회원가입
    void join(MemberVO memberVO);

//    아이디 중복
    boolean isDuplicateId(String memid);

//    로그인
    MemberVO login(MemberVO memberVO);

//    당일 예약 환자 기본 정보
    void insertChartMem(MemberVO memberVO);
}
