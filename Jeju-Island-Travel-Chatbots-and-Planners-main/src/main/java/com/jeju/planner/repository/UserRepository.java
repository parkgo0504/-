package com.jeju.planner.repository;

import com.jeju.planner.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// 해당 클래스를 레파지토리로 생성하겠다
@Repository

// < Entity, pk > type
public interface UserRepository extends JpaRepository<UserEntity, String> {

    public boolean existsByUserIdAndUserPw(String userId, String userPw);

    public UserEntity findByUserId(String userId);



}




