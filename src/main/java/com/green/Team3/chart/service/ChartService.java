package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;

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
}
