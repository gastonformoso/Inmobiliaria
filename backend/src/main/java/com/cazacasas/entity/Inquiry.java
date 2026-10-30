package com.cazacasas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name="inquiry")
public class Inquiry {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="property_id") private Property property;
    @Column(nullable=false,length=120) private String name;
    @Column(nullable=false,length=150) private String email;
    @Column(length=40) private String phone;
    @Column(nullable=false,columnDefinition="TEXT") private String message;
    @Column(nullable=false,length=20) private String status="PENDING";
    @Column(name="created_at") private LocalDateTime createdAt=LocalDateTime.now();
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Property getProperty(){return property;} public void setProperty(Property p){this.property=p;}
    public String getName(){return name;} public void setName(String n){this.name=n;}
    public String getEmail(){return email;} public void setEmail(String e){this.email=e;}
    public String getPhone(){return phone;} public void setPhone(String p){this.phone=p;}
    public String getMessage(){return message;} public void setMessage(String m){this.message=m;}
    public String getStatus(){return status;} public void setStatus(String s){this.status=s;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime c){this.createdAt=c;}
}
