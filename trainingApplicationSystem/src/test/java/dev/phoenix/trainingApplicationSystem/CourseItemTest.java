package dev.phoenix.trainingApplicationSystem;
import dev.phoenix.trainingApplicationSystem.controllers.CourseListController;
import dev.phoenix.trainingApplicationSystem.controllers.UserController;
import dev.phoenix.trainingApplicationSystem.model.CourseItem;
import dev.phoenix.trainingApplicationSystem.model.User;
import dev.phoenix.trainingApplicationSystem.services.CourseListService;
import dev.phoenix.trainingApplicationSystem.services.UserService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = {UserController.class, CourseListController.class})
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
public class CourseItemTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private CourseListService courseListService;

    private User user;
    private CourseItem course1;
    private CourseItem course2;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(ObjectId.get());
        user.setUserID("1");
        user.setUserName("testUser");
        user.setPassword("testPassword");
        user.setUserFName("Test");
        user.setUserLName("User");
        user.setUserEmail("testuser@example.com");

        course1 = new CourseItem();
        course1.setSessionID("1");
        course1.setSessionName("Test Course 1");
        course1.setFieldType("Online");
        course1.setLocation("Remote");
        //course1.setSessionStartDate("2022-01-01");
        //course1.setSessionEndDate("2022-01-15");

        course2 = new CourseItem();
        course2.setSessionID("2");
        course2.setSessionName("Test Course 2");
        course2.setFieldType("In-person");
        course2.setLocation("New York");
        //course2.setSessionStartDate("2022-02-01");
        //course2.setSessionEndDate("2022-02-15");
    }

    // User Controller Tests

    @Test
    void getSingleUserName_ReturnsUser_WhenUserExists() throws Exception {
        when(userService.findByUserName("testUser")).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/user/testUser")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.userName").value("testUser"))
                .andExpect(jsonPath("$.password").value("testPassword"))
                .andExpect(jsonPath("$.userFName").value("Test"))
                .andExpect(jsonPath("$.userLName").value("User"))
                .andExpect(jsonPath("$.userEmail").value("testuser@example.com"));
    }


}
