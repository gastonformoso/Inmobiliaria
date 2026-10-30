package com.cazacasas;

import com.cazacasas.repository.PropertyRepository;
import com.cazacasas.service.PropertyService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.*;

class PropertyServiceTest {
    @Test
    void featuredReturnsList() {
        PropertyRepository repo = Mockito.mock(PropertyRepository.class);
        Mockito.when(repo.findAll(Mockito.any(org.springframework.data.jpa.domain.Specification.class)))
            .thenReturn(java.util.List.of());
        PropertyService s = new PropertyService(repo);
        assertNotNull(s.featured());
    }
}
