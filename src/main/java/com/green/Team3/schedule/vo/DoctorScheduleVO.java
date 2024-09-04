package com.green.Team3.schedule.vo;

import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

//의사의 개인 일정 및 진료 일정 전체 조회만!!!!을 위한 vo
@Data
public class DoctorScheduleVO {
    private int schNum;
    private int staffNum;
    private String title;
    private String start;
    private String end;
    private String description;
    private String color;
    private String allDay;
    private String personalYN;
}
