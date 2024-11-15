package com.chole.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages = {"com.chole.BackendChole", "com.chole.demo"})
@EntityScan(basePackages = "com.chole.BackendChole.model")
@EnableJpaRepositories(basePackages = "com.chole.BackendChole.Repository") // Reemplaza con el paquete correcto
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
