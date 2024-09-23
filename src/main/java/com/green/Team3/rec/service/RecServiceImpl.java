package com.green.Team3.rec.service;

import com.green.Team3.rec.vo.RecVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service("recService")
public class RecServiceImpl implements RecService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void insertRec(@RequestBody RecVO recVO) {
        sqlSession.insert("recMapper.insertRec", recVO);
    }

    @Override
    public List<RecVO> selectWaitPatie() {
        return sqlSession.selectList("recMapper.selectWaitPatie");
    }

    @Override
    public List<RecVO> selectIngPatie() {
        return sqlSession.selectList("recMapper.selectIngPatie");
    }

    @Override
    public void updateStatus(RecVO recVO) {
        sqlSession.update("recMapper.updateStatus", recVO);
    }

    @Override
    public void endStatus(RecVO recVO) {
        sqlSession.update("recMapper.endStatus", recVO);
    }

    @Override
    public List<RecVO> selectHis(int patieNum) {
        return sqlSession.selectList("recMapper.selectHis", patieNum);
    }

    @Override
    public RecVO selectRevise(RecVO recVO) {
        return sqlSession.selectOne("recMapper.selectRevise", recVO);
    }

    @Override
    public void updateRevise(RecVO recVO) {

        sqlSession.update("recMapper.updateRevise", recVO);
    }

    @Override
    public void delRec(int recNum) {
        sqlSession.delete("recMapper.delRec", recNum);
    }

    // <!-- ============== 환자관리 예약 페이지 ==============   -->
    /* 당일 예약 리스트 조회 */
    @Override
    public List<RecVO> selectTodayRec() {
        return sqlSession.selectList("recMapper.selectTodayRec");
    }

    /* 회원 예약리스트 조회 */
    @Override
    public List<RecVO> selectAllRec() {
        return sqlSession.selectList("recMapper.selectAllRec");
    }

    /* 예약정보 상세보기*/
    @Override
    public RecVO getRecInfo(int recNum) {
        return sqlSession.selectOne("recMapper.getRecInfo", recNum);
    }

    /*<!-- ============== 회원페이지 진료예약 ==============   -->*/
    /* 회원 진료 예약 */
    @Override
    public void insertMainRec(RecVO recVO) {
        sqlSession.insert("recMapper.insertMainRec", recVO);
    }

    /* 회원 당사자 예약 조회 */
    @Override
    public List<RecVO> selectIdRec(int patieNum) {
        return sqlSession.selectList("recMapper.selectIdRec", patieNum);
    }

    /* 당사자 예약 삭제*/
    @Override
    public void delIdRec(int recNum) {
        sqlSession.delete("recMapper.delIdRec", recNum);
    }

}

