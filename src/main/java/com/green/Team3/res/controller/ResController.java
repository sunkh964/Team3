package com.green.Team3.res.controller;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.res.service.ResService;
import com.green.Team3.res.vo.ResVO;
import com.green.Team3.staff.vo.StaffVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/selectResNum/{memNum}")
    public ResVO selectResNum(@PathVariable("memNum") int memNum){
        return resService.selectResNum(memNum);
    }


}
