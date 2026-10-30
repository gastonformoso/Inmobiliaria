package com.cazacasas.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}") private String secret;
    public String generate(String subject){
        return Jwts.builder().subject(subject).issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis()+86400000))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
    }
    public String validate(String token){
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
            .parseSignedClaims(token).getPayload().getSubject();
    }
}
