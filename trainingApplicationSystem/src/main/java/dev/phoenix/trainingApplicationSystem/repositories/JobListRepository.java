package dev.phoenix.trainingApplicationSystem.repositories;

import dev.phoenix.trainingApplicationSystem.model.JobItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobListRepository extends MongoRepository<JobItem, ObjectId> {
    Optional<JobItem> findJobsByJobID(String jobID);

        Optional<List<JobItem>> findByFieldType(String fieldType);
}
