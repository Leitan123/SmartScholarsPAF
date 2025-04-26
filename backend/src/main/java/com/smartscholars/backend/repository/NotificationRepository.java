package com.smartscholars.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.smartscholars.backend.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    List<Notification> findByUserIdOrderByTimestampDesc(String userId);
}
