package com.green.Team3.history.vo;

import com.green.Team3.member.vo.MemberVO;
import lombok.Data;

import java.util.List;

@Data
public class HistoryVO {
    private int hisNum;
    private String illName;
    private String illDetail;
    private List<MemberVO> memberList;
    private List<HistoryVO> staffList;
}