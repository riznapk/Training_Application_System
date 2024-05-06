package dev.phoenix.trainingApplicationSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection="applied-courses-list")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationListItem {
    @Id
    private ObjectId id;

    private String userID;


    private List sessionIDList;

    public ApplicationListItem(String userID, List sessionIDList) {
        this.userID = userID;
        this.sessionIDList = sessionIDList;
    }

}
