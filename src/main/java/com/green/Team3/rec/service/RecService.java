package com.green.Team3.rec.service;

import com.green.Team3.rec.vo.RecVO;

import java.util.List;

public interface RecService {
    /*첫방문 환자 예약*/
    void insertRec(RecVO recVO);
    /*대기 환자 리스트*/
    List<RecVO> selectWaitPatie();

    /*진료 환자 리스트*/
    List<RecVO> selectIngPatie();

    /*진료 환자 변경*/
    void updateStatus(RecVO recVO);

    /*진료 완료*/
    void endStatus(RecVO recVO);
}
