package dev.phoenix.trainingApplicationSystem.repositories;

import dev.phoenix.trainingApplicationSystem.model.ApplicationListItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends MongoRepository<ApplicationListItem, ObjectId> {
    ApplicationListItem findByUserID(String userID);
}
