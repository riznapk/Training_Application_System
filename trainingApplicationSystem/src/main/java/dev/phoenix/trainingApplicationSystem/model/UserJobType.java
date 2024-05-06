package dev.phoenix.trainingApplicationSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection="user-job-field-type")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserJobType {
    @Id
    private ObjectId id;

    private String userID;
    private List fieldTypeList;

    public UserJobType(String userID, List fieldTypeList) {
        this.userID = userID;
        this.fieldTypeList = fieldTypeList;
    }


}
