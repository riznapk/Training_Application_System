package dev.phoenix.trainingApplicationSystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "job-list")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class JobItem {
    @Id
    private ObjectId id;
    private String jobID;
    private String jobTitle;
    private String jobCompany;
    private String applyLink;
    private String fieldType;

    private String jobDescription;
    private String salaryRange;
    private String preRequisites;
}
