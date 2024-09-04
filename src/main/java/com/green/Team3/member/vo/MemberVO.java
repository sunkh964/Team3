package com.green.Team3.member.vo;

import com.green.Team3.patie.vo.PatieVO;
import lombok.Data;

@Data
public class MemberVO {
    private int memNum;
    private String memName;
    private String memBirth;
    private String memTel;
    private String memAddr;
    private String memId;
    private String memPw;
    private  String memGen;
    private PatieVO patie;
}
