package dev.phoenix.trainingApplicationSystem.controllers;

import dev.phoenix.trainingApplicationSystem.services.UserService;
import dev.phoenix.trainingApplicationSystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/user")
public class UserController{
    @Autowired
    private UserService userService;
    //to get a User object from a user name
    @GetMapping("/{userName}")
    public ResponseEntity<Optional<User>> getSingleUserName(@PathVariable String userName){
        return new ResponseEntity<Optional<User>>(userService.findByUserName(userName), HttpStatus.OK);
    }
    //to post the information given by the user at the time of registration
    @PostMapping("/register")
    public ResponseEntity<String> addNewUserOnRegister(@RequestBody User user){
        return new ResponseEntity<>(userService.addNewUser(user,user.getUserName()), HttpStatus.CREATED);
    }
    //To check authentication of the user at the time of login
    @PostMapping("/login")
    public ResponseEntity<?> loginExistingUser(@RequestBody  Map <String,String> payload) {
        Optional<User> user = userService.login(payload.get("userName"), payload.get("password"));
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    //to update the information  of the user on edit details
    @PutMapping("/users/{userID}")
    public ResponseEntity<Void> updateUser(@PathVariable String userID, @RequestBody User updatedUser) {
        userService.updateUser(userID, updatedUser);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
