package com.cazacasas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name="admin_user")
public class AdminUser {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=150) private String email;
    @Column(name="password_hash",nullable=false,length=200) private String passwordHash;
    @Column(nullable=false,length=30) private String role="ADMIN";
    @Column(name="created_at") private LocalDateTime createdAt=LocalDateTime.now();
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getEmail(){return email;} public void setEmail(String e){this.email=e;}
    public String getPasswordHash(){return passwordHash;} public void setPasswordHash(String p){this.passwordHash=p;}
    public String getRole(){return role;} public void setRole(String r){this.role=r;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime c){this.createdAt=c;}
}