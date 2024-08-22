package com.green.Team3.res.controller;

import com.green.Team3.res.service.ResService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/res")
public class ResController {
    @Resource(name = "resService")
    private ResService resService;
}
