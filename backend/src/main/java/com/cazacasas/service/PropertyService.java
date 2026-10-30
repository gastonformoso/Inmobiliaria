package com.cazacasas.service;

import com.cazacasas.dto.PropertyDto;
import com.cazacasas.entity.Property;
import com.cazacasas.repository.PropertyRepository;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;

@Service
public class PropertyService {
    private final PropertyRepository repo;
    public PropertyService(PropertyRepository repo){this.repo=repo;}

    public Page<PropertyDto> search(String op, String city, String type, BigDecimal min, BigDecimal max, Integer beds, BigDecimal minArea, int page, int size) {
        Specification<Property> spec = (root,q,cb)->{
            List<Predicate> p = new ArrayList<>();
            p.add(cb.isTrue(root.get("published")));
            if (op!=null && !op.isBlank()) p.add(cb.equal(root.get("operationType"), op));
            if (city!=null && !city.isBlank()) p.add(cb.like(cb.lower(root.get("city")), "%"+city.toLowerCase()+"%"));
            if (type!=null && !type.isBlank()) p.add(cb.equal(root.get("propertyType"), type));
            if (min!=null) p.add(cb.greaterThanOrEqualTo(root.get("price"), min));
            if (max!=null) p.add(cb.lessThanOrEqualTo(root.get("price"), max));
            if (beds!=null) p.add(cb.greaterThanOrEqualTo(root.get("bedrooms"), beds));
            if (minArea!=null) p.add(cb.greaterThanOrEqualTo(root.get("totalArea"), minArea));
            return cb.and(p.toArray(new Predicate[0]));
        };
        Pageable pg = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return repo.findAll(spec, pg).map(this::toDto);
    }

    public PropertyDto byId(Long id){
        Property p = repo.findById(id).orElseThrow(() -> new RuntimeException("No encontrada"));
        return toDto(p);
    }

    public List<PropertyDto> featured(){
        return repo.findAll((root,q,cb)->cb.and(cb.isTrue(root.get("published")), cb.isTrue(root.get("featured")))).stream().map(this::toDto).toList();
    }

    private PropertyDto toDto(Property p){
        List<String> imgs = p.getImages().stream().map(i->i.getImageUrl()).toList();
        return new PropertyDto(p.getId(), p.getTitle(), p.getDescription(), p.getOperationType(), p.getPropertyType(),
            p.getPrice(), p.getCurrency(), p.getProvince(), p.getCity(), p.getNeighborhood(), p.getAddress(),
            p.getBedrooms(), p.getBathrooms(), p.getRooms(), p.getCoveredArea(), p.getTotalArea(),
            p.getParkingSpaces(), p.getPublished(), p.getFeatured(), imgs);
    }
}
