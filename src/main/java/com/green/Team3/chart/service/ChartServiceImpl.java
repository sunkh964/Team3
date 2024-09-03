package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;
import com.green.Team3.history.vo.HistoryVO;
import com.green.Team3.part.vo.PartVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("chartService")
public class ChartServiceImpl implements ChartService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*당일 예약 환자 리스트*/
    @Override
    public List<ChartVO> selectMemChart() {
        return sqlSession.selectList("chartMapper.selectMemChart");
    }

    /*진료 환자 리스트*/
    @Override
    public List<ChartVO> getIsNowMemChart() {
        return sqlSession.selectList("chartMapper.getIsNowMemChart");
    }

    /*진료 환자로 옮기기*/
    @Override
    public void changeIsNow(ChartVO chartVO) {
        sqlSession.update("chartMapper.changeIsNow", chartVO);
    }

    /*진료 환자 집보내기*/
    @Override
    public void delIsNow(ChartVO chartVO) {
        sqlSession.update("chartMapper.delIsNow", chartVO);
    }

    /*차트 수정 기본정보*/
    @Override
    public ChartVO reviseInfo(int memNum) {
        return sqlSession.selectOne("chartMapper.reviseInfo", memNum);
    }

    /*차트 업데이트*/
    @Override
    public void updateChart(ChartVO chartVO) {
        sqlSession.update("chartMapper.updateChart", chartVO);
    }

    /*병력 업데이트*/
    @Override
    public void updateHistory(HistoryVO historyVO) {
        sqlSession.update("chartMapper.updateHistory", historyVO);
    }

    /*차트 등록하기*/
    @Override
    public void insertChart(ChartVO chartVO) {
        sqlSession.insert("chartMapper.insertChart", chartVO);
    }

    /*차트 번호가져오기*/

    @Override
    public ChartVO selectChartNum(int memNum) {
        return  sqlSession.selectOne("chartMapper.selectChartNum", memNum);
    }
}
