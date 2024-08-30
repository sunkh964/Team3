package com.green.Team3.q.controller;

import com.green.Team3.q.service.QService;
import com.green.Team3.q.vo.QVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/q")
public class QController {
    @Resource(name = "qService")
    private QService qService;

    //    문의한 글 목록 조회
    @GetMapping("/list/{memNum}")
    public List<QVO> qnaList(@PathVariable("memNum") int memNum){
        return qService.qnaList(memNum);
    }

//    문의하기 글 등록
    @PostMapping("/qupdate")
    public void insertQ(@RequestBody QVO qvo){
        qService.insertQ(qvo);
    }

//    질문 상세보기
    @GetMapping("/qdetail/{qNum}")
    public QVO qdetail(@PathVariable("qNum")int qNum){
        return qService.qdetail(qNum);
    }

//    답변 목록 보기
    @GetMapping("/reply/{qNum}")
    public QVO reply(@PathVariable("qNum")int qNum){
        return qService.reply(qNum);
    }
}
