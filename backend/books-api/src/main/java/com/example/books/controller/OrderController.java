package com.example.books.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    // Логіка автентифікації для ДЗ
    private boolean isAuthenticated(String authHeader) {
        return authHeader != null && authHeader.equals("Bearer valid-token-123");
    }

    @GetMapping
    public ResponseEntity<?> getOrders(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(401).body("Помилка: Неавторизовано (GET)");
        return ResponseEntity.ok("Список замовлень отримано");
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> body, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(401).body("Помилка: Неавторизовано (POST)");
        return ResponseEntity.status(201).body("Замовлення створено успішно: " + body);
    }

    @PutMapping
    public ResponseEntity<?> updateOrder(@RequestBody Map<String, Object> body, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(401).body("Помилка: Неавторизовано (PUT)");
        return ResponseEntity.ok("Замовлення повністю оновлено");
    }

    @PatchMapping
    public ResponseEntity<?> patchOrder(@RequestBody Map<String, Object> body, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(401).body("Помилка: Неавторизовано (PATCH)");
        return ResponseEntity.ok("Дані замовлення частково змінено");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteOrder(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAuthenticated(auth)) return ResponseEntity.status(401).body("Помилка: Неавторизовано (DELETE)");
        return ResponseEntity.ok("Замовлення видалено");
    }
}