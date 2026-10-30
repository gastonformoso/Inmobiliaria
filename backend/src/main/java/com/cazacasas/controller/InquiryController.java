package com.cazacasas.controller;

import com.cazacasas.entity.Inquiry;
import com.cazacasas.repository.InquiryRepository;
import com.cazacasas.repository.PropertyRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {
    private final InquiryRepository repo;
    private final PropertyRepository props;
    public InquiryController(InquiryRepository repo, PropertyRepository props){this.repo=repo;this.props=props;}

    @PostMapping
    public Inquiry create(@RequestBody Inquiry in){
        if (in.getProperty()!=null && in.getProperty().getId()!=null) {
            in.setProperty(props.findById(in.getProperty().getId()).orElse(null));
        }
        return repo.save(in);
    }
    @GetMapping
    public List<Inquiry> all(){ return repo.findAll(); }
}
