package dev.phoenix.trainingApplicationSystem;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.phoenix.trainingApplicationSystem.controllers.UserController;
import dev.phoenix.trainingApplicationSystem.model.User;
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
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private User user;

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
    }

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
    @Test
    void addNewUserOnRegister_ReturnsCreated_WhenUserIsAddedSuccessfully() throws Exception {
        when(userService.addNewUser(any(User.class), anyString())).thenReturn("success");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated());
    }



}

