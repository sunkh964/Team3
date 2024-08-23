package com.green.Team3.staff.controller;

import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.service.StaffService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffController {
    @Resource(name = "staffService")
    private StaffService staffService;

    //부서 목록 조회
    @GetMapping("/getPart")
    public List<PartVO> getPartList(){
        return staffService.getPartList();
    }
}
