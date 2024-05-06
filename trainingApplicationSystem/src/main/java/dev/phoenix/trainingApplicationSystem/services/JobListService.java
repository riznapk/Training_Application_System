package dev.phoenix.trainingApplicationSystem.services;

import dev.phoenix.trainingApplicationSystem.model.JobItem;
import dev.phoenix.trainingApplicationSystem.repositories.JobListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class JobListService {
    @Autowired
    private JobListRepository repository;
    public List<JobItem> findAllJobs() {
        return  repository.findAll();
    }
    public Optional<JobItem> findJobsByJobID(String jobID) {
        return repository.findJobsByJobID(jobID);
    }

    public Optional<List<JobItem>> findAllJobsByFieldType(String fieldType){
        return repository.findByFieldType(fieldType);
    }
}
