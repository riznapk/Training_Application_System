package dev.phoenix.trainingApplicationSystem.repositories;

import dev.phoenix.trainingApplicationSystem.model.CourseItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CourseListRepository extends MongoRepository<CourseItem, ObjectId> {
    Optional<CourseItem> findCoursesBySessionID(String sessionID);

    //list ids
    List<CourseItem> findBySessionIDIn(List<String> sessionIDs);
}
