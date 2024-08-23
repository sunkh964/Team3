package com.green.Team3.staff.service;

import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.vo.StaffVO;

import java.util.List;

public interface StaffService {

    // 부서 목록 조회
    List<PartVO> getPartList();

    // 직원 등록
    void regStaff(StaffVO staffVO);
}
