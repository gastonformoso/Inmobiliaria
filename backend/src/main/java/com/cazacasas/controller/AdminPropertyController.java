package com.cazacasas.controller;

import com.cazacasas.entity.Property;
import com.cazacasas.repository.PropertyRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/properties")
public class AdminPropertyController {
    private final PropertyRepository repo;
    public AdminPropertyController(PropertyRepository repo){this.repo=repo;}

    @GetMapping public List<Property> all(){return repo.findAll();}
    @PostMapping public Property create(@RequestBody Property p){return repo.save(p);}
    @PutMapping("/{id}") public Property update(@PathVariable Long id, @RequestBody Property p){
        p.setId(id); return repo.save(p);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){ repo.deleteById(id); }
}
