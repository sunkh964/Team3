package com.green.Team3.rec.vo;

import com.green.Team3.patie.vo.PatieVO;
import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

import java.util.List;

@Data
public class RecVO {
    private int recNum;
    private String recDate;
    private String recEDate;
    private String isRec;
    private String recStatus;
    private String recDetail;
    private int patieNum;
    private int staffNum;
    private String color;
    private String personalYN;
    private StaffVO staffVO;
    private PatieVO patieVO;

}
