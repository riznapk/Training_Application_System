package dev.phoenix.trainingApplicationSystem.controllers;

import dev.phoenix.trainingApplicationSystem.services.UserJobTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
    @RequestMapping("/api/job-field-type")
public class UserJobTypeController{
    @Autowired
    private UserJobTypeService userJobTypeService;

    //adding to fieldtype list
    @PostMapping("/fieldTypeList/{fieldType}/{userID}")
    public ResponseEntity<String> addFieldTypeByUserID(@PathVariable String fieldType,@PathVariable String userID){
        System.out.println("jobtype payload "+fieldType);
        return new ResponseEntity<>(userJobTypeService.addJobTypeList(fieldType,userID), HttpStatus.CREATED);
    }


    @GetMapping("/list/{userID}")
    public ResponseEntity<List> getFieldTypeList(@PathVariable String userID){
        return new ResponseEntity<>(userJobTypeService.getJobTypeListByUserID(userID), HttpStatus.CREATED);
    }

}




