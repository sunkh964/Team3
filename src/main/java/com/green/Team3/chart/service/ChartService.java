package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;

import java.util.List;

public interface ChartService {
    List<ChartVO> selectMemChart();

    List<ChartVO> getIsNowMemChart();
}
