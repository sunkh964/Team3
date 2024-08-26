package com.green.Team3.chart.controller;

import com.green.Team3.chart.service.ChartService;
import com.green.Team3.chart.vo.ChartVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chart")
public class ChartController {
    @Resource(name = "chartService")
    private ChartService chartService;

    @GetMapping("/chartList")
    public List<ChartVO> selectMemChart(){
        return chartService.selectMemChart();
    }

    @GetMapping("/getIsNowMemChart")
    public List<ChartVO> getIsNowMemChart(){
        return chartService.getIsNowMemChart();
    }
}
