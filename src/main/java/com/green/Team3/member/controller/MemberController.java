package com.green.Team3.member.controller;

import com.green.Team3.member.service.MemberService;
import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.patie.vo.PatieVO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        memberService.join1(memberVO);
        //patie에서 insert

    }

//환자와 회원가입이 동시에 진행
//    @PostMapping("join1")
//    public void join1(@RequestBody PatieVO patie){
//        memberService.join1(patie);
//    }

//    아이디 중복 확인
    @GetMapping("/checkId/{inputId}")
    public boolean checkId(@PathVariable("inputId")String inputId){
        log.info(inputId);
        return memberService.isDuplicateId(inputId);
    }

//    로그인
    @PostMapping("/login")
    public MemberVO  login(@RequestBody MemberVO memberVO){
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
//    당일 예약 환자 기본 정보 차트 추가
    @PostMapping("/insertChartMem")
    public MemberVO insertChartMem(@RequestBody MemberVO memberVO){
        memberService.insertChartMem(memberVO);
        return memberVO;
    }

}
