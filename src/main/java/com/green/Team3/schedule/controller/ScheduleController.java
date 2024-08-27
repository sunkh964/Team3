package com.green.Team3.schedule.controller;

import com.green.Team3.schedule.service.ScheduleService;
import com.green.Team3.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Resource(name = "scheduleService")
    private ScheduleService scheduleService;

//    전체 목록 조회
    @GetMapping("/getAllList")
    public List<ScheduleVO> getAllList() {
        return scheduleService.getAllList();
    }

//    새 이벤트 등록하기
    @PostMapping("/addEvent")
    public void addEvent(@RequestBody ScheduleVO scheduleVO) {
        System.out.println(scheduleVO);
//        scheduleService.addEvent(scheduleVO);
    }
}
