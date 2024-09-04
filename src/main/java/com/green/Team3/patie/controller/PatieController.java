package com.green.Team3.patie.controller;

import com.green.Team3.patie.service.PatieService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patie")
public class PatieController {
    @Resource(name = "patieService")
    private PatieService patieService;
}
