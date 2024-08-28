package com.green.Team3.member.controller;

import com.green.Team3.member.service.MemberService;
import com.green.Team3.member.service.MemberServiceImpl;
import com.green.Team3.member.vo.MemberVO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {
    private static final Logger log = LoggerFactory.getLogger(MemberController.class);
    @Resource(name = "memberService")
    private MemberService memberService;

//    회원 가입
    @PostMapping("/join")
    public void join(@RequestBody MemberVO memberVO){
        memberService.join(memberVO);
    }

//    아이디 중복 확인
    @GetMapping("/checkId/{inputId}")
    public boolean checkId(@PathVariable("inputId")String inputId){
        log.info(inputId);
        return memberService.isDuplicateId(inputId);
    }

//    로그인
    @PostMapping("/login")
    public MemberVO login(@RequestBody MemberVO memberVO){
        return memberService.login(memberVO);
    }

    //    마이페이지 개인정보 수정화면 띄우는
    @GetMapping("/infoupdate/{memId}")
    public MemberVO getInfo(@PathVariable("memId") String memId){
        return memberService.getInfo(memId);
    }

    //    개인정보 수정하기
    @PutMapping("/update")
    public void update(@RequestBody MemberVO memberVO) {
        memberService.update(memberVO);
    }
//    당일 예약 환자 기본 정보
    @PostMapping("/insertChartMem")
    public MemberVO insertChartMem(@RequestBody MemberVO memberVO){
        memberService.insertChartMem(memberVO);
        return memberVO;
    }
}
