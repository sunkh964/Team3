package com.green.Team3.rec.controller;

import com.green.Team3.patie.service.PatieService;
import com.green.Team3.rec.service.RecService;
import com.green.Team3.rec.vo.RecVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rec")
public class RecController {
    @Resource(name = "recService")
    private RecService recService;

    /*첫방문 환자 등록*/
    @PostMapping("/insertRec")
    void insertRec(@RequestBody RecVO recVO) {
        recService.insertRec(recVO);
    }

    /*대기 환자 리스트*/
    @GetMapping("/selectWaitPatie")
    List<RecVO> selectWaitPatie() {
        return recService.selectWaitPatie();
    }

    /*진료  환자 리스트*/
    @GetMapping("/selectIngPatie")
    List<RecVO> selectIngPatie() {
        return recService.selectIngPatie();
    }
    /*진료 환자 변경*/
    @PutMapping("/updateStatus")
    void updateStatus(@RequestBody RecVO recVO){
        recService.updateStatus(recVO);
    }

    /*진료 완료 */
    @PutMapping("/endStatus")
    void endStatus(@RequestBody RecVO recVO){
        recService.endStatus(recVO);
    }

    /*진료 이력 리스트*/
    @GetMapping("/selectHis/{patieNum}")
    List<RecVO> selectHis(@PathVariable("patieNum")int patieNum){
        return recService.selectHis(patieNum);
    }

    /*수정 기본 정보*/
    @GetMapping("/selectRevise/{patieNum}/{recNum}")
    RecVO selectRevise(RecVO recVO){
        return recService.selectRevise(recVO);
    }

    @PutMapping("/updateRevise")
    public void updateRevise(@RequestBody RecVO recVO){
        recService.updateRevise(recVO);
    }

}
