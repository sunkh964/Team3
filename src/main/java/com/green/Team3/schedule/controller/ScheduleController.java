package com.green.Team3.schedule.controller;

import com.green.Team3.schedule.service.ScheduleService;
import com.green.Team3.schedule.vo.ScheduleVO;
import com.green.Team3.util.DateTimeUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
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

        String startDate = DateTimeUtil.getFormattedStringDate(scheduleVO.getStart(), "yyyy-MM-dd HH:mm:ss");
        String endDate = DateTimeUtil.getFormattedStringDate(scheduleVO.getEnd(), "yyyy-MM-dd HH:mm:ss");

        scheduleVO.setStart(startDate);
        scheduleVO.setEnd(endDate);

        scheduleService.addEvent(scheduleVO);
    }

//    일정 상세 조회
    @GetMapping("/getDetail/{schNum}")
    public ScheduleVO getDetail(@PathVariable(name = "schNum") int schNum) {
        return scheduleService.getDetail(schNum);
    }
}
