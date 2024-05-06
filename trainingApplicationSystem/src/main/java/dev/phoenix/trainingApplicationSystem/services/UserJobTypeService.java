package dev.phoenix.trainingApplicationSystem.services;

import dev.phoenix.trainingApplicationSystem.model.UserJobType;
import dev.phoenix.trainingApplicationSystem.repositories.UserJobTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;

@Service
public class UserJobTypeService {
    @Autowired
    private UserJobTypeRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public  List  getJobTypeListByUserID(String userID){
        UserJobType user = repository.findByUserID((userID));
        return user.getFieldTypeList();
    }

    public String addJobTypeList(@PathVariable String fieldType,@PathVariable String userId){
        UserJobType existingJT = repository.findByUserID(userId);

        if (existingJT == null) {
            // User does not exist in job-type table, so create a new document with the given field type
            UserJobType newJobType = new UserJobType(userId, Collections.singletonList(fieldType));

            mongoTemplate.insert(newJobType);
            return "success - new user";
        } else {
            // User already exists in job-type table
            List<String> fieldTypeList = existingJT.getFieldTypeList();
            if (!fieldTypeList.contains(fieldType)) {
                // Job type is not already present, so add it to the list
                fieldTypeList.add(fieldType);
                existingJT.setFieldTypeList(fieldTypeList);
                repository.save(existingJT);
            }
            return "success - existing";
        }

    }



}
