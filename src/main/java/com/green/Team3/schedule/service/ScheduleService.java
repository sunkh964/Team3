package com.green.Team3.schedule.service;

import com.green.Team3.schedule.vo.EventVO;
import com.green.Team3.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {
    List<ScheduleVO> getAllList();
    void addEvent(ScheduleVO scheduleVO);
    ScheduleVO getDetail(int schNum);
    void deleteEvent(int schNum);
}
