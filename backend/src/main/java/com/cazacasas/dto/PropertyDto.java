package com.cazacasas.dto;

import java.math.BigDecimal;
import java.util.List;

public record PropertyDto(
  Long id, String title, String description, String operationType, String propertyType,
  BigDecimal price, String currency, String province, String city, String neighborhood, String address,
  Integer bedrooms, Integer bathrooms, Integer rooms, BigDecimal coveredArea, BigDecimal totalArea,
  Integer parkingSpaces, Boolean published, Boolean featured, List<String> images
) {}
