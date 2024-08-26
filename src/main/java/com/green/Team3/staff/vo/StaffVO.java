package com.green.Team3.staff.vo;

import com.green.Team3.part.vo.PartVO;
import lombok.Data;

@Data
public class StaffVO {
    private int staffNum;
    private String staffName;
    private String staffRole;
    private String staffBirth;
    private String staffTel;
    private String staffAddr;
    private String staffId;
    private String staffPw;
    private String staffGen;
    private PartVO part;
}
