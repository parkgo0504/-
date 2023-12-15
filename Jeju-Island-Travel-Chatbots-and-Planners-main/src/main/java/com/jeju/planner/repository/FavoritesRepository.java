package com.jeju.planner.repository;

import com.jeju.planner.entity.FavoritesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritesRepository extends JpaRepository<FavoritesEntity, String> {
}
