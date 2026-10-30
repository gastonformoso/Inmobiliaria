package com.cazacasas.entity;

import jakarta.persistence.*;

@Entity
@Table(name="property_image")
public class PropertyImage {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="property_id",nullable=false)
    private Property property;
    @Column(name="image_url",nullable=false,length=500) private String imageUrl;
    @Column(name="display_order",nullable=false) private Integer displayOrder=0;

    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Property getProperty(){return property;} public void setProperty(Property p){this.property=p;}
    public String getImageUrl(){return imageUrl;} public void setImageUrl(String u){this.imageUrl=u;}
    public Integer getDisplayOrder(){return displayOrder;} public void setDisplayOrder(Integer d){this.displayOrder=d;}
}
