package com.smartscholars.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartscholars.backend.config.JwtUtil;
import com.smartscholars.backend.entity.Notification;
import com.smartscholars.backend.entity.User;
import com.smartscholars.backend.repository.UserRepository;
import com.smartscholars.backend.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractEmail(authHeader.substring(7));
        User user = userRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(notificationService.getNotificationsForUser(user.getId()));
    }

    @PutMapping("/mark-read")
    public ResponseEntity<String> markAsRead(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractEmail(authHeader.substring(7));
        User user = userRepository.findByEmail(email).orElseThrow();
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok("Marked as read");
    }
}
