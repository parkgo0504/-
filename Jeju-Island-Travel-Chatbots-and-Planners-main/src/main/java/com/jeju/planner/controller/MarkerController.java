package com.jeju.planner.controller;


import com.jeju.planner.dto.MarkerDto;
import com.jeju.planner.entity.MarkerEntity;
import com.jeju.planner.repository.MarkerRepository;
import com.jeju.planner.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MarkerController {
    private final MarkerRepository markerRepository;
    private final MarkerService markerService;

    @Autowired
    public MarkerController(MarkerRepository markerRepository, MarkerService markerService) {
        this.markerRepository = markerRepository;
        this.markerService = markerService;
    }

    @GetMapping("/mark")
    public List<MarkerEntity> getMarkersByTourType(@RequestBody MarkerDto markerDto) {
        String tourtype = markerDto.getTourtype();
        // 이미 생성된 MarkerService 인스턴스를 사용
        // 주입된 의존성을 통해 객체가 생성되었음
        List<MarkerEntity> markers = markerService.getMarkersByTourType(tourtype);
        // 클라이언트에 결과를 반환
        return markers;

    }
    // 사용자검색창
    @GetMapping("/input")
    public List<MarkerEntity> getMarkersByName(@RequestParam String name){
        List<MarkerEntity> input = markerService.getMarkerByInput(name);
        return input;
    }

}
