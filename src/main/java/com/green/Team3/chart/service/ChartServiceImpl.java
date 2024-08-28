package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;
import com.green.Team3.part.vo.PartVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("chartService")
public class ChartServiceImpl implements ChartService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*당일 예약 환자 리스트*/
    @Override
    public List<ChartVO> selectMemChart() {
        return sqlSession.selectList("chartMapper.selectMemChart");
    }

    /*진료 환자 리스트*/
    @Override
    public List<ChartVO> getIsNowMemChart() {
        return sqlSession.selectList("chartMapper.getIsNowMemChart");
    }

    /*진료 환자로 옮기기*/
    @Override
    public void changeIsNow(ChartVO chartVO) {
        sqlSession.update("chartMapper.changeIsNow", chartVO);
    }

    /*진료 환자 집보내기*/
    @Override
    public void delIsNow(ChartVO chartVO) {
        sqlSession.update("chartMapper.delIsNow", chartVO);
    }

}
