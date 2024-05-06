package dev.phoenix.trainingApplicationSystem;
import dev.phoenix.trainingApplicationSystem.controllers.JobListController;
import dev.phoenix.trainingApplicationSystem.model.JobItem;
import dev.phoenix.trainingApplicationSystem.services.JobListService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
public class JobListControllerTest {
    @Mock
    private JobListService service;

    @InjectMocks
    private JobListController controller;

    @Test
    public void testGetAllJobs() {
        // Arrange
        List<JobItem> expected = new ArrayList<>();
        expected.add(new JobItem());
        expected.add(new JobItem());
        expected.add(new JobItem());

        when(service.findAllJobs()).thenReturn(expected);

        // Act
        ResponseEntity<List<JobItem>> response = controller.getAllJobs();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
    }

    @Test
    public void testGetSingleJob() {
        // Arrange
        JobItem expected = new JobItem();
        expected.setId(new ObjectId());
        expected.setJobID("12345");
        when(service.findJobsByJobID(expected.getJobID())).thenReturn(Optional.of(expected));
        // Act
        ResponseEntity<Optional<JobItem>> response = controller.getSingleJob(expected.getJobID());

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody().get());
    }
}
