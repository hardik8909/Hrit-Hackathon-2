package com.example.Vayunetra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class VayunetraApplication {

	public static void main(String[] args) {

		SpringApplication.run(VayunetraApplication.class, args);
		System.out.println("Hello");
	}

}
