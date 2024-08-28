package com.green.Team3.res.controller;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.res.service.ResService;
import com.green.Team3.res.vo.ResVO;
import com.green.Team3.staff.vo.StaffVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/res")
public class ResController {
    @Resource(name = "resService")
    private ResService resService;

    @PostMapping("/insertChartRes")
    public void insertChartRes(@RequestBody ResVO resVO){
        resService.insertChartRes(resVO);
    }


}
