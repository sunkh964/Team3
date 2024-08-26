package com.green.Team3.schedule.controller;

import com.green.Team3.schedule.service.ScheduleService;
import com.green.Team3.schedule.vo.EventVO;
import com.green.Team3.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Resource(name = "scheduleService")
    private ScheduleService scheduleService;

    @GetMapping("/getAllList")
    public List<ScheduleVO> getAllList() {
        return scheduleService.getAllList();
    }

}
