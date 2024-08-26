package com.green.Team3.staff.controller;

import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.service.StaffService;
import com.green.Team3.staff.vo.StaffVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

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

    // 직원 등록
    @PostMapping("/regStaff")
    public void regStaff(@RequestBody StaffVO staffVO){
        staffService.regStaff(staffVO);
    }

    // 직원 조회
    @GetMapping("/getStaff")
    public void getStaffList(StaffVO staffVO){
        staffService.getStaffList(staffVO);
    }
}
