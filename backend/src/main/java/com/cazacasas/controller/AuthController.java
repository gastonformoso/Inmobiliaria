package com.cazacasas.controller;

import com.cazacasas.entity.AdminUser;
import com.cazacasas.repository.AdminUserRepository;
import com.cazacasas.service.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AdminUserRepository repo;
    private final JwtService jwt;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public AuthController(AdminUserRepository repo, JwtService jwt){this.repo=repo;this.jwt=jwt;}

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> body){
        AdminUser u = repo.findByEmail(body.get("email")).orElseThrow();
        if (!body.get("password").equals(u.getPasswordHash())) throw new RuntimeException("Credenciales inválidas");
        return Map.of("token", jwt.generate(u.getEmail()));
    }
}
