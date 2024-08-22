package com.green.Team3.a.vo;

import com.green.Team3.q.vo.QVO;
import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

import java.util.List;

@Data
public class AVO {
    private int aNum;
    private int staffNum;
    private String aContent;
    private String aDate;
    private int qNum;
    private List<QVO> q;
    private List<StaffVO> staff;
}
