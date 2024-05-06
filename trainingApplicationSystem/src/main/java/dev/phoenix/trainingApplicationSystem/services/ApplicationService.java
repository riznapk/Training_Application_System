package dev.phoenix.trainingApplicationSystem.services;

import dev.phoenix.trainingApplicationSystem.model.ApplicationListItem;
import dev.phoenix.trainingApplicationSystem.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public  List  getSessionIdListByUserID(String userID){
        ApplicationListItem user = repository.findByUserID((userID));
        return user.getSessionIDList();
    }


//adding course ids to th list
    public String addCourseIds(@PathVariable String  userID, @PathVariable String  sessionID){
        ApplicationListItem existingUser = repository.findByUserID(userID);

        if (existingUser == null) {
            // User does not exist in job-type table, so create a new document with the given field type
            ApplicationListItem newCourseID = new ApplicationListItem(userID, Collections.singletonList(sessionID));
            mongoTemplate.insert(newCourseID);
            return "success - new user";
        } else {
            // User already exists in job-type table
            List<String> sessionIDList = existingUser.getSessionIDList();
            if (!sessionIDList.contains(sessionID)) {
                // Job type is not already present, so add it to the list
                sessionIDList.add(sessionID);
                existingUser.setSessionIDList(sessionIDList);
                repository.save(existingUser);
            }
            return "success - existing";
        }
    }


    //to delete the coursid from the list
    public String deleteCourseIds(@PathVariable String userID, @PathVariable String sessionID) {
        ApplicationListItem existingUser = repository.findByUserID(userID);

        if (existingUser != null) {
            // User exists in the database
            List<String> sessionIDList = existingUser.getSessionIDList();
            if (sessionIDList.contains(sessionID)) {
                // Session ID is present in the list, so remove it
                sessionIDList.remove(sessionID);
                existingUser.setSessionIDList(sessionIDList);
                repository.save(existingUser);
                return "success - session ID deleted";
            } else {
                // Session ID is not present in the list
                return "error - session ID not found";
            }
        } else {
            // User does not exist in the database
            return "error - user not found";
        }
    }



}
