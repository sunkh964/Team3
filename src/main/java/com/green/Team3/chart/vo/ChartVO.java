package com.green.Team3.chart.vo;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.res.vo.ResVO;
import lombok.Data;

import java.util.List;

@Data
public class ChartVO {
    private int chartNum;
    private int memNum;
    private String isNow;
    private List<ResVO> resMemList;
}
