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

    /*대기환자 삭제*/
    void delRec(int recNum);

// <!-- ============== 환자관리 예약 페이지 ==============   -->
    /* 당일 예약리스트 조회 */
    List<RecVO> selectTodayRec();

    /* 회원 예약리스트 조회 */
    List<RecVO> selectAllRec();

    /* 예약정보 상세보기 */
    RecVO getRecInfo(int recNum);

/*<!-- ============== 회원페이지 진료예약 ==============   -->*/
    /* 회원 진료 예약 */
    void insertMainRec(RecVO recVO);

    /* 회원 당사자 예약 조회 */
    List<RecVO> selectIdRec(int patieNum);

    /*당사자 예약 삭제*/
    void delIdRec(int recNum);

    /* 예약 정보 수정 */
    void updateIdRec(RecVO recVO);

}
