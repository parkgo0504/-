package com.jeju.planner.repository;

import com.jeju.planner.entity.PlanEntity;
import com.jeju.planner.entity.QnaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaRepository extends JpaRepository<QnaEntity,String> {
}
