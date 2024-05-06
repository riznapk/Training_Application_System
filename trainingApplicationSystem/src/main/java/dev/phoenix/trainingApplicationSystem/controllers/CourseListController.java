package dev.phoenix.trainingApplicationSystem.controllers;

import dev.phoenix.trainingApplicationSystem.services.CourseListService;
import dev.phoenix.trainingApplicationSystem.model.CourseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/course-list")
public class CourseListController{
    @Autowired
    private CourseListService courseListService;
    //to get all training information
    @GetMapping
    public ResponseEntity<List<CourseItem>> getAllCourses() {
        return new ResponseEntity<List<CourseItem>>(courseListService.findAllCourses(), HttpStatus.OK);
    }
    //To get the single training information

    @GetMapping("/{sessionID}")
    public ResponseEntity<Optional<CourseItem>> getSingleCourse(@PathVariable String sessionID){
        return new ResponseEntity<Optional<CourseItem>>(courseListService.findCoursesBySessionID(sessionID), HttpStatus.OK);
    }
    //To get the whole training description for the array of sessionids passed
    @GetMapping("/list/courses")
    public ResponseEntity<List<CourseItem>> getCoursesByIds(@RequestParam List<String> sessionIDs) {
        List<CourseItem> courses = courseListService.findCoursesByIds(sessionIDs);
        if (courses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(courses);
        }
    }





}




