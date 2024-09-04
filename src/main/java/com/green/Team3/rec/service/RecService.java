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

    /*진료 이력 리스트*/
    List<RecVO> selectHis(int patieNum);

    /*차트 수정*/
    RecVO selectRevise(RecVO recVO);

    /*차트 업데이트*/
    void updateRevise(RecVO recVO);
}
