package com.green.Team3.schedule.vo;

import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

import java.util.List;

@Data
public class ScheduleVO {
    private int schNum;
    private int staffNum;
    private String title;
    private String start;
    private String end;
    private String description;
    private StaffVO staffVO;
}