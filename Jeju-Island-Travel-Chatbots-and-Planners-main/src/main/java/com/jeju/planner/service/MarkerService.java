package com.jeju.planner.service;

import com.jeju.planner.entity.MarkerEntity;
import com.jeju.planner.repository.MarkerRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
@Service
public class MarkerService {

    private final MarkerRepository markerRepository;

    public MarkerService(MarkerRepository markerRepository) {
        this.markerRepository = markerRepository;
    }

    public List<MarkerEntity> getMarkersByTourType(String tourtype) {
        // 여기에서 다양한 비즈니스 로직을 수행할 수 있음
        // 예를 들어, 특정 조건에 따라 데이터를 가공하거나 추가적인 처리를 할 수 있음
        return markerRepository.findByTourtype(tourtype);
    }

    public List<MarkerEntity> getMarkerByInput(String name) {
        try {

            return markerRepository.findByNameContainingAndLatNotAndLngNot(name,"0","0");
        } catch (Exception e) {
            // 여기서 예외 처리를 수행합니다.
            // 예를 들어, 로깅하거나 특정 예외를 다시 throw하거나 빈 리스트 등을 반환할 수 있습니다.
            e.printStackTrace(); // 예외 정보를 콘솔에 출력하거나 로깅 시스템에 기록할 수 있습니다.
            return Collections.emptyList(); // 빈 리스트 반환 또는 다른 적절한 처리 방법을 선택합니다.
        }
    }
}
