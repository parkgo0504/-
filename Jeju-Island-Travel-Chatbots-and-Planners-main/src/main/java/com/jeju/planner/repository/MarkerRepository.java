package com.jeju.planner.repository;

import com.jeju.planner.entity.MarkerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerRepository extends JpaRepository<MarkerEntity,String> {
    public List<MarkerEntity> findByTourtype(String tourtype);

    public List<MarkerEntity> findByName(String name);

    public List<MarkerEntity> findByNameContainingAndLatNotAndLngNot(String name,String latValue,String lngValue);


}

