package com.green.Team3.chart.vo;

import com.green.Team3.member.vo.MemberVO;
import lombok.Data;

import java.util.List;

@Data
public class ChartVO {
    private String isNow;
    private List<MemberVO> memberList;
}
