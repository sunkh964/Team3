package com.green.Team3.chart.controller;

import com.green.Team3.chart.service.ChartService;
import com.green.Team3.chart.vo.ChartVO;
import com.green.Team3.history.vo.HistoryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chart")
public class ChartController {

    @Autowired
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
    @PutMapping("/delIsNow")
    public void delIsNow(@RequestBody ChartVO chartVO){
        chartService.delIsNow(chartVO);
    }

    /*수정 기본 정보*/
    @GetMapping("/reviseInfo/{memNum}")
    public ChartVO reviseInfo(@PathVariable("memNum") int memNum){
        return chartService.reviseInfo(memNum);
    }

    /*차트 업데이트*/
    @PutMapping("/updateChart")
    public void updateChart(@RequestBody ChartVO chartVO) {
        chartService.updateChart(chartVO);
    }

    /*병력 업데이트*/
    @PutMapping("/updateHistory")
    public void updateHistory(@RequestBody HistoryVO historyVO) {
        chartService.updateHistory(historyVO);
    }

    /*차트 등록하기*/
    @PostMapping("/insertChart")
    public void insertChart(@RequestBody ChartVO chartVO){
        chartService.insertChart(chartVO);
    }

}
