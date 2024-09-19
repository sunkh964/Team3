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

    @DeleteMapping("/delRec/{recNum}")
    public void delRec(@PathVariable("recNum") int recNum){
        recService.delRec(recNum);
    }

// <!-- ============== 환자관리 예약 페이지 ==============   -->
    /* 당일 예약 리스트 조회*/
    @GetMapping("/selectTodayRec")
    List<RecVO> selectTodayRec(){
        return recService.selectTodayRec();
    }

    /* 회원 예약리스트 조회 */
    @GetMapping("/selectAllRec")
    List<RecVO> selectAllRec(){
        return recService.selectAllRec();
    }

    /* 예약 상세정보 조회 */
    @GetMapping("/getRecInfo/{recNum}")
    public RecVO getRecInfo(@PathVariable("recNum")int recNum){
        return recService.getRecInfo(recNum);
    }

/*<!-- ============== 회원페이지 진료예약 ==============   -->*/
    /* 회원 진료 예약 */
    @PostMapping("/insertMainRec")
    void insertMainRec(@RequestBody RecVO recVO) {
        recService.insertMainRec(recVO);
    }

    /* 회원 당사자 예약 조회 */
    @GetMapping("/selectIdRec/{patieNum}")
    List<RecVO> selectIdRec(@PathVariable("patieNum")int patieNum) {
        return recService.selectIdRec(patieNum);
    }

    /* 당사자 예약 삭제 */
    @DeleteMapping("/delIdRec/{recNum}")
    public void delIdRec(@PathVariable("recNum") int recNum){
        recService.delIdRec(recNum);
    }



}
