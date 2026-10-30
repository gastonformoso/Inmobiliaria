package com.cazacasas.controller;

import com.cazacasas.dto.PropertyDto;
import com.cazacasas.service.PropertyService;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    private final PropertyService service;
    public PropertyController(PropertyService service){this.service=service;}

    @GetMapping
    public org.springframework.data.domain.Page<PropertyDto> search(
            @RequestParam(required=false) String operationType,
            @RequestParam(required=false) String city,
            @RequestParam(required=false) String propertyType,
            @RequestParam(required=false) BigDecimal minPrice,
            @RequestParam(required=false) BigDecimal maxPrice,
            @RequestParam(required=false) Integer bedrooms,
            @RequestParam(required=false) BigDecimal minArea,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="12") int size) {
        return service.search(operationType, city, propertyType, minPrice, maxPrice, bedrooms, minArea, page, size);
    }

    @GetMapping("/{id}")
    public PropertyDto byId(@PathVariable Long id){ return service.byId(id); }

    @GetMapping("/featured")
    public List<PropertyDto> featured(){ return service.featured(); }
}
