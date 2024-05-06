package dev.phoenix.trainingApplicationSystem.services;

import dev.phoenix.trainingApplicationSystem.model.User;

import java.util.Optional;

public interface UserService {
    String addNewUser(User user, String userName);
    Optional<User> login(String userName, String password);
    Optional<User> findByUserName (String userName) ;
    void updateUser(String userID, User updatedUser);
}


