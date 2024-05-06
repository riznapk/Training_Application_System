package dev.phoenix.trainingApplicationSystem.repositories;

import dev.phoenix.trainingApplicationSystem.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findUserByUserID(String userID);
    Optional<User> findByUserName(String userName);

}
