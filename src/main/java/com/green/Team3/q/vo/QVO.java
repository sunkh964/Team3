package com.green.Team3.q.vo;

import com.green.Team3.a.vo.AVO;
import com.green.Team3.member.vo.MemberVO;
import lombok.Data;

import java.util.List;

@Data
public class QVO {
    private int qNum;
    private int memNum;
    private String qTitle;
    private String qContent;
    private String qDate;
    private AVO a;
    private MemberVO member;
}
