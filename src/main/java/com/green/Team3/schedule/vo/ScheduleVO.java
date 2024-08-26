package com.green.Team3.schedule.vo;

import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

import java.util.List;

@Data
public class ScheduleVO {
    private int schNum;
    private String schSDate;
    private String schEDate;
    private String schTitle;
    private String schContent;
    private String schIsAll;
    private List<StaffVO> staffList;
}