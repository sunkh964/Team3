package com.green.Team3.staff.controller;

import com.green.Team3.staff.service.StaffService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/staff")
public class StaffController {
    @Resource(name = "staffService")
    private StaffService staffService;
}
