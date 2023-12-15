package com.jeju.planner.controller;

import com.jeju.planner.dto.PlanDto;
import com.jeju.planner.dto.PlanOneDto;
import com.jeju.planner.repository.PlanRepository;
import com.jeju.planner.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/plan")
public class PlanController {

    private final PlanRepository planRepository;
    private final PlanService planService;

    @Autowired
    public PlanController(PlanRepository planRepository, PlanService planService) {
        this.planRepository = planRepository;
        this.planService = planService;
    }

    /*
    @GetMapping("/save")
    public ResponseEntity<String> savePlan(@RequestBody List<PlanEntity> planEntity) {
        try {
            // 서비스 클래스를 통해 엔티티를 저장하고 반환
            planService.savePlan(planEntity);
            return ResponseEntity.ok("저장 성공!");
        } catch (Exception e) {
            return ResponseEntity.ok("저장실패..");
        }


    }
*/
    @GetMapping("/select")
    public List<HashMap<String, Object>> getTourPlan(@RequestParam("user_id") String user_id, @RequestParam("plan_title") String plan_title) {
        return planService.getTourPlan(user_id, plan_title);
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deleteOne(@RequestParam("user_id") String user_id, @RequestParam("plan_title") String plan_title) {
        // 서비스 메소드 호출
        String result = planService.delete(plan_title, user_id);

        // 결과에 따른 응답 반환
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.ok("오류?");

        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody List<PlanDto> planDtoList){
        try{

            for (PlanDto planDto : planDtoList) {
                String planTitle = planDto.getPlan_title();
                String userId = planDto.getUser_id();
                // 기존 계획 삭제
                planService.delete(planTitle, userId);}
            for(PlanDto planDto : planDtoList){
                planService.savePlan(planDto);
            }
            return ResponseEntity.ok("저장성공");
        }catch (Exception e){
            return ResponseEntity.ok("저장실패");
        }

    }
    @GetMapping("/oneselect")
    public List<PlanOneDto> oneselect(@RequestParam("user_id") String user_id){
        return planService.selectone(user_id);

    }
}