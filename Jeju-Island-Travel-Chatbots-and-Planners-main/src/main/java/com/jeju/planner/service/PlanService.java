package com.jeju.planner.service;

import com.jeju.planner.dto.PlanDto;
import com.jeju.planner.dto.PlanOneDto;
import com.jeju.planner.entity.PlanEntity;
import com.jeju.planner.mapper.PlanMapper;
import com.jeju.planner.repository.PlanRepository;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final PlanMapper planmapper;


    // 여행계획 저장
    @Autowired
    public PlanService(PlanRepository planRepository, PlanMapper planmapper) {
        this.planRepository = planRepository;
        this.planmapper = planmapper;
    }
    //public List<PlanEntity> savePlan(List<PlanEntity> planEntity) {
        // 받은 PlanEntity를 저장하고 저장된 엔티티를 반환
      //  return planRepository.saveAll(planEntity);
    //}
    
    // 여행계획 보여주기
    public List<HashMap<String, Object>> getTourPlan(String user_id, String plan_title) {
        return planmapper.getTourPlan(user_id, plan_title);
    }


    // 여행계획 전체삭제
    public String delete(String plan_title, String user_id){
        try{
            planmapper.delete(plan_title, user_id);
            return "삭제성공!";
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
    public PlanEntity savePlan(PlanDto planDto) {
        // 받은 PlanEntity를 저장하고 저장된 엔티티를 반환
       PlanEntity planEntity = new PlanEntity();
       planEntity.setPlan_order(planDto.getPlan_order());
       planEntity.setPlan_title(planDto.getPlan_title());
       planEntity.setUser_id(planDto.getUser_id());
       planEntity.setDay_num(planDto.getDay_num());
       planEntity.setAttr_num(planDto.getAttr_num());
       return planRepository.save(planEntity);
    }

    public List<PlanOneDto> selectone(String user_id){
        return  planmapper.selectone(user_id);
    }

}
