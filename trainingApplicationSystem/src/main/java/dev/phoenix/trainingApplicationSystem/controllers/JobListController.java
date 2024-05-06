package dev.phoenix.trainingApplicationSystem.controllers;

import dev.phoenix.trainingApplicationSystem.services.JobListService;
import dev.phoenix.trainingApplicationSystem.model.JobItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/job-list")
public class JobListController {
    @Autowired
    private JobListService jobListService;

    @GetMapping
    public ResponseEntity<List<JobItem>> getAllJobs() {
        return new ResponseEntity<List<JobItem>>(jobListService.findAllJobs(), HttpStatus.OK);
    }

    @GetMapping("/{jobID}")
    public ResponseEntity<Optional<JobItem>> getSingleJob(@PathVariable String jobID){
        return new ResponseEntity<Optional<JobItem>>(jobListService.findJobsByJobID(jobID), HttpStatus.OK);
    }

    @GetMapping("/type/{fieldType}")
    public ResponseEntity<Optional<List<JobItem>>> getAllJobByFieldType(@PathVariable String fieldType){
        return new ResponseEntity<Optional<List<JobItem>>>(jobListService.findAllJobsByFieldType(fieldType), HttpStatus.OK);
    }

}


