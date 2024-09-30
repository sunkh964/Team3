package com.green.Team3.cus.controller;

import com.green.Team3.cus.service.CusService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cus")
public class CusController {
    @Resource(name = "cusService")
    private CusService cusService;


}
