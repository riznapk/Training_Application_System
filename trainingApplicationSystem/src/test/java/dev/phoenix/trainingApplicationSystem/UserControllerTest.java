package dev.phoenix.trainingApplicationSystem;

import dev.phoenix.trainingApplicationSystem.model.User;
import dev.phoenix.trainingApplicationSystem.repositories.UserRepository;
import dev.phoenix.trainingApplicationSystem.services.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.mongodb.internal.connection.tlschannel.util.Util.assertTrue;
import static org.bson.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @LocalServerPort
    private int port;

    private String baseUrl;

    @BeforeAll
    public void setUp() throws Exception {
        baseUrl = "http://localhost:" + port + "/api/user";
    }

    @Test
    public void testAddNewUserOnRegister() {
        // Create a new user
        User user = new User("8989","JohnDoe", "password", "John", "Doe", "johndoe@example.com");

        // Make a POST request to add the new user
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(baseUrl + "/register", user, String.class);

        // Verify that the response is successful
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        // Verify that the user has been added to the repository
        Optional<User> savedUser = userRepository.findByUserName("JohnDoe");
        assertTrue(savedUser.isPresent());
    }

    @Test
    public void testLoginExistingUser() {
        // Create a new user
        User user = new User("898","JaneDoe", "password", "Jane", "Doe", "janedoe@example.com");
        userService.addNewUser(user, user.getUserName());

        // Make a POST request to log in with the user's credentials
        Map<String, String> payload = new HashMap<>();
        payload.put("userName", "JaneDoe");
        payload.put("password", "password");
        ResponseEntity<User> responseEntity = restTemplate.postForEntity(baseUrl + "/login", payload, User.class);

        // Verify that the response is successful and that the user is returned
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals("JaneDoe", responseEntity.getBody().getUserName());
    }

    @Test
    public void testUpdateUser() {
        // Create a new user
        User user = new User("jo9di","AliceSmith", "password", "Alice", "Smith", "alicesmith@example.com");
        userService.addNewUser(user, user.getUserName());

        // Update the user's information
        user.setUserFName("AliceUpdated");
        user.setUserLName("SmithUpdated");

        // Make a PUT request to update the user
        restTemplate.put(baseUrl + "/users/" + user.getUserID(), user);

        // Verify that the user's information has been updated in the repository
        Optional<User> savedUser = userRepository.findByUserName("AliceSmith");
        assertTrue(savedUser.isPresent());
        assertEquals("AliceUpdated", savedUser.get().getUserFName());
        assertEquals("SmithUpdated", savedUser.get().getUserLName());
    }

}
