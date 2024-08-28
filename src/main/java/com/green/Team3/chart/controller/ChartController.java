package com.green.Team3.chart.controller;

import com.green.Team3.chart.service.ChartService;
import com.green.Team3.chart.vo.ChartVO;
import com.green.Team3.part.vo.PartVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chart")
public class ChartController {
    @Resource(name = "chartService")
    private ChartService chartService;

    /*당일 예약 환자 리스트*/
    @GetMapping("/chartList")
    public List<ChartVO> selectMemChart(){
        return chartService.selectMemChart();
    }

    /*진료 환자 리스트*/
    @GetMapping("/getIsNowMemChart")
    public List<ChartVO> getIsNowMemChart(){
        return chartService.getIsNowMemChart();
    }

    /*진료 환자 리스트로 옮기기*/
    @PutMapping("/changeIsNow")
    public void changeIsNow(@RequestBody ChartVO chartVO){
        chartService.changeIsNow(chartVO);
    }

    /*진료 환자 집보내기*/
    @PutMapping("delIsNow")
    public void delIsNow(@RequestBody ChartVO chartVO){
        chartService.delIsNow(chartVO);
    }
}
