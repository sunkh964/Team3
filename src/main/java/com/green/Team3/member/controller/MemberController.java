package com.green.Team3.member.controller;

import com.green.Team3.member.service.MemberService;
import com.green.Team3.member.service.MemberServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {
    @Resource(name = "memberService")
    private MemberService memberService;
}
