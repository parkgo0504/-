package com.jeju.planner;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
@MapperScan("com.jeju.planner.mapper")
public class PlannerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlannerApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")

						.allowedOrigins("https://zerotoc-75b9b.web.app/",  "http://localhost:3000/");

						//allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}
}