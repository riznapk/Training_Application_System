package dev.phoenix.trainingApplicationSystem.controllers;

import dev.phoenix.trainingApplicationSystem.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/my-courses")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    //adding to the sessionIDList
    @PostMapping("/sessionList/{userID}/{sessionID}")
    public ResponseEntity<String> applyToCourses(@PathVariable String userID,@PathVariable String sessionID){
        System.out.println("session payload "+ sessionID);
        return new ResponseEntity<>(applicationService.addCourseIds(userID,sessionID), HttpStatus.CREATED);
    }

    //Get sessionIdList by userID
    @GetMapping("/{userID}")
    public ResponseEntity<List> getSessionList(@PathVariable String userID){
        return new ResponseEntity<>(applicationService.getSessionIdListByUserID(userID), HttpStatus.CREATED);
    }

    // to delete the course id from the list

    @DeleteMapping("/users/{userID}/sessions/{sessionID}")
    public ResponseEntity<String> dropCourse(@PathVariable String userID, @PathVariable String sessionID){
        return new ResponseEntity<>(applicationService.deleteCourseIds(userID,sessionID), HttpStatus.CREATED);
    }

}
