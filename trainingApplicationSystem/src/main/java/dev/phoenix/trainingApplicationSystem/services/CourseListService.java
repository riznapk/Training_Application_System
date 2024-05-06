package dev.phoenix.trainingApplicationSystem.services;

import dev.phoenix.trainingApplicationSystem.model.CourseItem;
import dev.phoenix.trainingApplicationSystem.repositories.CourseListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CourseListService {

    @Autowired
    private CourseListRepository repository;
    //to get all the course details
    public List<CourseItem> findAllCourses() {
        return repository.findAll();
    }
    //to get the course details of single id
    public Optional<CourseItem> findCoursesBySessionID(String sessionID) {
        return repository.findCoursesBySessionID(sessionID);
    }
    //To get course info for list of ids
    public List<CourseItem> findCoursesByIds(List<String> sessionIDs) {
        return repository.findBySessionIDIn(sessionIDs);
    }

}
