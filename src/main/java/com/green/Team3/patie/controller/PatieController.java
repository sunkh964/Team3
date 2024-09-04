package com.green.Team3.patie.controller;

import com.green.Team3.patie.service.PatieService;
import com.green.Team3.patie.vo.PatieVO;
import com.green.Team3.patie.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patie")
public class PatieController {
    @Resource(name = "patieService")
    private PatieService patieService;

    @PostMapping("/insertPatie")
    public int insertPatie(@RequestBody PatieVO patieVO){
        //이번에 추가할 환자번호 조회
        int patieNum = patieService.getNextPatieNum();

        //환자정보 등록
        patieVO.setPatieNum(patieNum);
        patieService.insertPatie(patieVO);

        return patieNum;
    }

    @PostMapping("/searchPaties")
    public List<PatieVO> searchPaties(@RequestBody(required = false) SearchVO searchVO){
        return patieService.searchPaties(searchVO);
    }
}
