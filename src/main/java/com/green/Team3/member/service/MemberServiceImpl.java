package com.green.Team3.member.service;

import com.green.Team3.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Struct;

@Service("memberService")
public class MemberServiceImpl implements MemberService {
    @Autowired
    private SqlSessionTemplate sqlSession;

//    회원가입
    @Override
    public void join(MemberVO memberVO) {
        sqlSession.insert("memberMapper.join", memberVO);
    }

//    아이디 중복 확인
//    중복-> true
//    중복x ->false
    @Override
    public boolean isDuplicateId(String memid) {
        String id=sqlSession.selectOne("memberMapper.isDuplicate", memid);
        return id!=null;
    }

    @Override
    public MemberVO login(MemberVO memberVO) {
        return sqlSession.selectOne("memberMapper.login", memberVO);
    }

    @Override
    public void insertChartMem(MemberVO memberVO) {
        sqlSession.insert("memberMapper.insertChartMem", memberVO);
    }
}
