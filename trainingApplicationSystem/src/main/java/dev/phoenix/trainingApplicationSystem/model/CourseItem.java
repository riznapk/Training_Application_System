package dev.phoenix.trainingApplicationSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Document(collection = "course-list")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseItem {
    @Id
    private ObjectId id;
    private String sessionID;
    private String sessionName;
    private String sessionDescription;
    private String sessionInstructor;
    private String sessionDuration;
    private List<String> sessionLevel;
    private String Location;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date sessionStartDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date sessionEndDate;
    private String fieldType;
    private String sessionModules;
    private String imageURL;

}
