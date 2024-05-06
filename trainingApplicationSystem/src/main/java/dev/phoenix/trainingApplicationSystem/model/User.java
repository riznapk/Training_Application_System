package dev.phoenix.trainingApplicationSystem.model;

import dev.phoenix.trainingApplicationSystem.model.CourseItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;


import java.util.List;
import java.util.Map;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;
    private String userID;
    private String userName;
    private String password;
    private String userFName;
    private String userLName;
    private String userEmail;

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
    public String getPassword() {
        return password;
    }

    public User(String userID, String userName, String password, String userFName, String userLName, String userEmail) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
        this.userFName = userFName;
        this.userLName = userLName;
        this.userEmail = userEmail;
    }

    public User (Map user){
        this.setUserEmail(user.get("userEmail").toString());
    }
    @DocumentReference
    private List<CourseItem> sessionIDs;
}
