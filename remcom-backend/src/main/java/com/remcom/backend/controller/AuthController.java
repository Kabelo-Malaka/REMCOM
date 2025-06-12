package com.remcom.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        // TODO: Implement authentication logic and return JWT or session token
        return ResponseEntity.status(501).body("Not implemented");
    }
}
