package com.jeju.planner.mapper;


import com.jeju.planner.dto.PlanOneDto;
import com.jeju.planner.entity.PlanEntity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.HashMap;
import java.util.List;

@Mapper

public interface PlanMapper {
    @Select("      SELECT a.*, b.name, b.addr, b.lat, b.lng, b.img, b.alltag, b.tourtype, b.raddr,\n" +
            "        b.tag, b.intro, b.tel, b.city, b.smallcity\n" +
            "        FROM tb_tour_plan a, tb_allattr_test b\n" +
            "        WHERE a.attr_num = b.attr_num\n" +
            "        AND a.user_id = #{user_id}\n" +
            "        AND a.plan_title = #{plan_title}")
    List<HashMap<String, Object>> getTourPlan(@Param("user_id") String user_id, @Param("plan_title") String plan_title);
    @Modifying
    @Delete("DELETE FROM tb_tour_plan e WHERE e.plan_title = #{plan_title} AND e.user_id = #{user_id}")
    void delete(
            @Param("plan_title") String plan_title,
            @Param("user_id") String user_id);


    @Select("SELECT DISTINCT user_id, plan_title FROM tb_tour_plan e WHERE e.user_id = #{user_id}")
    List<PlanOneDto>selectone(@Param("user_id")String user_id);
}

