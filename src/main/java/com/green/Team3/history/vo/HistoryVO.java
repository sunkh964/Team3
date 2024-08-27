package com.green.Team3.history.vo;

import com.green.Team3.chart.vo.ChartVO;
import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.res.vo.ResVO;
import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

import java.util.List;

@Data
public class HistoryVO {
    private int hisNum;
    private String illName;
    private String illDetail;
    private int memNum;
    private int staffNum;
    private int resNum;
    private int partNum;
    private int chartNum;
    private List<MemberVO> memberList;
    private List<StaffVO> staffList;
    private List<ResVO> resList;
    private List<PartVO> partList;
    private List<ChartVO> chartList;
}