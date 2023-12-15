package com.jeju.planner.repository;

import com.jeju.planner.dto.PlanDto;
import com.jeju.planner.entity.MarkerEntity;
import com.jeju.planner.entity.PlanEntity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PlanRepository extends JpaRepository<PlanEntity,String> {

}
