package com.green.Team3.res.vo;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.vo.StaffVO;
import lombok.Data;

import java.util.List;

@Data
public class ResVO {
    private int resNum;
    private String resTime;
    private List<MemberVO> memberList;
    private List<StaffVO> staffList;
    private List<PartVO> partList;
}
