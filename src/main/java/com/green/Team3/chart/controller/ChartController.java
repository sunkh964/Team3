package com.green.Team3.chart.controller;

import com.green.Team3.chart.service.ChartService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chart")
public class ChartController {
    @Resource(name = "chartService")
    private ChartService chartService;
}
