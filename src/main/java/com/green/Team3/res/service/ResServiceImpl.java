package com.green.Team3.res.service;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.res.vo.ResVO;
import com.green.Team3.staff.vo.StaffVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("resService")
public class ResServiceImpl implements ResService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*당일 예약 환자 등록*/
    @Override
    public void insertChartRes(ResVO resVO) {
        sqlSession.insert("resMapper.insertChartRes", resVO);
    }
}
