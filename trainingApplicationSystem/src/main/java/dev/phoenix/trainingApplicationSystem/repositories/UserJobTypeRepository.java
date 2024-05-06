package dev.phoenix.trainingApplicationSystem.repositories;

import dev.phoenix.trainingApplicationSystem.model.UserJobType;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserJobTypeRepository extends MongoRepository<UserJobType, ObjectId> {
    UserJobType findByUserID(String userID);
}
