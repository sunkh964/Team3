package com.green.Team3.member.service;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.patie.vo.PatieVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("memberService")
public class MemberServiceImpl implements MemberService {
    @Autowired
    private SqlSessionTemplate sqlSession;

//    회원가입
    @Override
    public void join(MemberVO memberVO) {
        sqlSession.insert("memberMapper.join", memberVO);
    }

//    회원가입
    @Override
    public void join1(MemberVO memberVO) {
        sqlSession.insert("memberMapper.join1", memberVO);
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

//    마이페이지 개인정보 수정 페이지 불러오기
    @Override
    public MemberVO getInfo(String memId) {
        MemberVO memberVO=sqlSession.selectOne("memberMapper.getInfo", memId);
        return memberVO;
    }

    //    개인정보 수정하기
    @Override
    public void update(MemberVO memberVO) {
        sqlSession.update("memberMapper.update", memberVO);
    }
    /*환자 기본 정보 등록*/
    @Override
    public MemberVO insertChartMem(MemberVO memberVO) {
        sqlSession.insert("memberMapper.insertChartMem", memberVO);
        return memberVO;
    }

}
