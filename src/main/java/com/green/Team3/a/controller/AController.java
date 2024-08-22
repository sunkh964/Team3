package com.green.Team3.a.controller;

import com.green.Team3.a.service.AService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/a")
public class AController {
    @Resource(name = "aService")
    private AService aService;
}
