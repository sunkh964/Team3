package com.green.Team3.chart.controller;

import com.green.Team3.chart.service.ChartService;
import com.green.Team3.chart.vo.ChartVO;
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
    public void updateChart(@RequestBody Map<String, Object> requestBody) {
        // 요청 본문에서 값 추출
        int chartNum = Integer.parseInt(requestBody.get("chartNum").toString());
        String isNow = (String) requestBody.get("isNow");

        // 서비스 호출
        chartService.updateChart(chartNum, isNow);
    }


    /*병력 업데이트*/
    @PutMapping("/updateHistory")
    public void updateHistory(@RequestBody Map<String, Object> requestBody) {
        // 요청 본문에서 값 추출
        int chartNum = Integer.parseInt(requestBody.get("chartNum").toString());
        String illName = (String) requestBody.get("illName");
        String illDetail = (String) requestBody.get("illDetail");
        int partNum = Integer.parseInt(requestBody.get("partNum").toString());
        int staffNum = Integer.parseInt(requestBody.get("staffNum").toString());

        // 서비스 호출
        chartService.updateHistory(chartNum, illName, illDetail, partNum, staffNum);
    }
}
