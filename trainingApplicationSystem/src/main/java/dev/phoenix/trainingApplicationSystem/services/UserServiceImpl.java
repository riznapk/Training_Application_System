package dev.phoenix.trainingApplicationSystem.services;

import dev.phoenix.trainingApplicationSystem.model.User;
import dev.phoenix.trainingApplicationSystem.repositories.UserRepository;
import dev.phoenix.trainingApplicationSystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Optional<User> findByUserName(String userName) {
        return repository.findByUserName(userName);
    }
    //Register functionality
    @Override
    public String addNewUser(User user, String userName) {
        Optional<User> existingJT = repository.findByUserName(userName);
        System.out.println("USERNAME: "+ userName);
        if (existingJT.isEmpty()) {
            mongoTemplate.insert(user);
            return "success";
        } else if(existingJT != null) {
            return "User already exist";
        }
        else return "something went wrong";
    }

    //loginFunctionality
    @Override
    public Optional<User> login(String userName, String password) {
        Optional<User> user = repository.findByUserName(userName);
        if (user != null && user.get().getPassword().equals(password)) {
            return user;
        } else {
            return null;
        }
    }

    //updateFunctionality
    @Override
    public void updateUser(String userID, User updatedUser) {
        Optional<User> userOptional = repository.findUserByUserID(userID);
        if (userOptional.isPresent()) {

            User user = userOptional.get();
            System.out.println("user"+user.getId());
            user.setUserName(updatedUser.getUserName());
            user.setUserID(updatedUser.getUserID());
            user.setPassword(updatedUser.getPassword());
            user.setUserFName(updatedUser.getUserFName());
            user.setUserLName(updatedUser.getUserLName());
            user.setUserEmail(updatedUser.getUserEmail());
            repository.save(user);

        } else {
            throw new RuntimeException("User not found with id: " + userID);

        }
    }



}