package com.cazacasas.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "property")
public class Property {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false,length=200) private String title;
    @Column(columnDefinition="TEXT") private String description;
    @Column(name="operation_type",nullable=false,length=20) private String operationType;
    @Column(name="property_type",nullable=false,length=30) private String propertyType;
    @Column(nullable=false,precision=15,scale=2) private BigDecimal price;
    @Column(nullable=false,length=10) private String currency = "USD";
    private String province, city, neighborhood, address;
    private Integer bedrooms, bathrooms, rooms, parkingSpaces;
    @Column(name="covered_area",precision=10,scale=2) private BigDecimal coveredArea;
    @Column(name="total_area",precision=10,scale=2) private BigDecimal totalArea;
    private Boolean published = true;
    private Boolean featured = false;
    @Column(name="created_at") private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name="updated_at") private LocalDateTime updatedAt = LocalDateTime.now();
    @OneToMany(mappedBy="property",cascade=CascadeType.ALL,orphanRemoval=true)
    private List<PropertyImage> images = new ArrayList<>();

    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTitle(){return title;} public void setTitle(String t){this.title=t;}
    public String getDescription(){return description;} public void setDescription(String d){this.description=d;}
    public String getOperationType(){return operationType;} public void setOperationType(String o){this.operationType=o;}
    public String getPropertyType(){return propertyType;} public void setPropertyType(String p){this.propertyType=p;}
    public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal p){this.price=p;}
    public String getCurrency(){return currency;} public void setCurrency(String c){this.currency=c;}
    public String getProvince(){return province;} public void setProvince(String p){this.province=p;}
    public String getCity(){return city;} public void setCity(String c){this.city=c;}
    public String getNeighborhood(){return neighborhood;} public void setNeighborhood(String n){this.neighborhood=n;}
    public String getAddress(){return address;} public void setAddress(String a){this.address=a;}
    public Integer getBedrooms(){return bedrooms;} public void setBedrooms(Integer b){this.bedrooms=b;}
    public Integer getBathrooms(){return bathrooms;} public void setBathrooms(Integer b){this.bathrooms=b;}
    public Integer getRooms(){return rooms;} public void setRooms(Integer r){this.rooms=r;}
    public Integer getParkingSpaces(){return parkingSpaces;} public void setParkingSpaces(Integer p){this.parkingSpaces=p;}
    public BigDecimal getCoveredArea(){return coveredArea;} public void setCoveredArea(BigDecimal c){this.coveredArea=c;}
    public BigDecimal getTotalArea(){return totalArea;} public void setTotalArea(BigDecimal t){this.totalArea=t;}
    public Boolean getPublished(){return published;} public void setPublished(Boolean p){this.published=p;}
    public Boolean getFeatured(){return featured;} public void setFeatured(Boolean f){this.featured=f;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime c){this.createdAt=c;}
    public LocalDateTime getUpdatedAt(){return updatedAt;} public void setUpdatedAt(LocalDateTime u){this.updatedAt=u;}
    public List<PropertyImage> getImages(){return images;} public void setImages(List<PropertyImage> i){this.images=i;}
}
