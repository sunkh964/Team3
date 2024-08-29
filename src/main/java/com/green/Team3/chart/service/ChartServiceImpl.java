package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;
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

    @Override
    public void updateChart(int chartNum, String isNow) {
        sqlSession.update("chartMapper.updateChart", Map.of(
                "chartNum", chartNum,
                "isNow", isNow
        ));
    }


    @Override
    public void updateHistory(int chartNum, String illName, String illDetail, int partNum, int staffNum) {
        // 병력 업데이트
        sqlSession.update("chartMapper.updateHistory", new HistoryUpdateParam(chartNum, illName, illDetail, partNum, staffNum));
    }

    // 파라미터 클래스를 내부에 정의하거나 별도의 파일로 분리해 사용할 수 있습니다.
    private static class ChartUpdateParam {
        private int chartNum;
        private String resTime;
        private String isNow;

        public ChartUpdateParam(int chartNum, String resTime, String isNow) {
            this.chartNum = chartNum;
            this.resTime = resTime;
            this.isNow = isNow;
        }

        // getters and setters
    }

    private static class HistoryUpdateParam {
        private int chartNum;
        private String illName;
        private String illDetail;
        private int partNum;
        private int staffNum;

        public HistoryUpdateParam(int chartNum, String illName, String illDetail, int partNum, int staffNum) {
            this.chartNum = chartNum;
            this.illName = illName;
            this.illDetail = illDetail;
            this.partNum = partNum;
            this.staffNum = staffNum;
        }

        // getters and setters
    }
}
