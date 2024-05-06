package dev.phoenix.trainingApplicationSystem;
import dev.phoenix.trainingApplicationSystem.model.JobItem;
import dev.phoenix.trainingApplicationSystem.repositories.JobListRepository;
import dev.phoenix.trainingApplicationSystem.services.JobListService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JobListServiceTest {
    @Mock
    private JobListRepository repository;

    @InjectMocks
    private JobListService service;

    @Test
    public void testFindAllJobs() {
        // Arrange
        List<JobItem> expected = new ArrayList<>();
        expected.add(new JobItem());
        expected.add(new JobItem());
        expected.add(new JobItem());
        when(repository.findAll()).thenReturn(expected);
        // Act
        List<JobItem> actual = service.findAllJobs();
        // Assert
        assertEquals(expected, actual);
    }

    @Test
    public void testFindJobsByJobID() {
        // Arrange
        JobItem expected = new JobItem();
        expected.setId(new ObjectId());
        expected.setJobID("12345");
        when(repository.findJobsByJobID(expected.getJobID())).thenReturn(Optional.of(expected));
        // Act
        Optional<JobItem> actual = service.findJobsByJobID(expected.getJobID());

        // Assert
        assertEquals(expected, actual.get());
    }

    @Test
    public void testFindAllJobsByFieldType() {
        // Arrange
        String fieldType = "Software Development";
        List<JobItem> expected = new ArrayList<>();
        expected.add(new JobItem());
        expected.add(new JobItem());
        when(repository.findByFieldType(fieldType)).thenReturn(Optional.of(expected));
        // Act
        Optional<List<JobItem>> actual = service.findAllJobsByFieldType(fieldType);
        // Assert
        assertEquals(expected, actual.get());
    }
}
