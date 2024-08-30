package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;
import com.green.Team3.history.vo.HistoryVO;
import com.green.Team3.part.vo.PartVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ChartService {
    /*당일 예약 환자 리스트*/
    List<ChartVO> selectMemChart();
    /*진료 환자 리스트*/
    List<ChartVO> getIsNowMemChart();
    /*진료 환자로 옮기기*/
    void changeIsNow(ChartVO chartVO);
    /*진료 환자 집보내기*/
    void delIsNow(ChartVO chartVO);
    /*차트 수정에 기본 정보*/
    ChartVO reviseInfo(int memNum);
    // 차트 업데이트
    void updateChart(ChartVO chartVO);
    // 병력 업데이트
    void updateHistory(HistoryVO historyVO);
    /*차트 등록하기*/
    void insertChart(ChartVO chartVO);

}
