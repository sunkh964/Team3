package com.green.Team3.staff.controller;

import com.green.Team3.schedule.vo.ScheduleVO;
import com.green.Team3.staff.service.StaffService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffController {
    @Resource(name = "staffService")
    private StaffService staffService;

//    직원 전체의 일정 목록 조회
    @GetMapping("/getAllList")
    public List<ScheduleVO> getAllList() {
        return staffService.getAllList();
    };

//    직원 한 명의 일정 목록 조회
    @GetMapping("/getOneList/{staffNum}")
    public List<ScheduleVO> getOneList(@PathVariable(name = "staffNum") int staffNum) {
        return staffService.getOneList(staffNum);
    }
}