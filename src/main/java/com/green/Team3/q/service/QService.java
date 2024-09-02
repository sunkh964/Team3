package com.green.Team3.q.service;

import com.green.Team3.a.vo.AVO;
import com.green.Team3.q.vo.QVO;

import java.util.List;

public interface QService {

//    문의한 글 목록 조회
    List<QVO> qnaList(int memNum);

//    문의하기 등록
    void insertQ(QVO qvo);

//    문의하기 상세조회
    QVO qdetail(int qNum);

//    답변 조회
    AVO reply(int qNum);
}
