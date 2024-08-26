package com.green.Team3.schedule.controller;

import com.green.Team3.schedule.service.ScheduleService;
import com.green.Team3.staff.service.StaffService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Resource(name = "scheduleService")
    private ScheduleService scheduleService;
}
