package dev.phoenix.trainingApplicationSystem;

import dev.phoenix.trainingApplicationSystem.controllers.ApplicationController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public
class TrainingApplicationSystemApplicationTests {
	@Autowired
	private ApplicationController applicationController;


	@Test
	public void contextLoads() throws Exception{
		assertThat(applicationController).isNotNull();
	}


}
