package com.example.books; // Якщо ваш головний файл у цьому пакеті, то залишайте так

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Налаштування для всього додатка
        registry.addMapping("/**") 
                .allowedOrigins("http://localhost:5173") 
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") 
                .allowedHeaders("*") 
                .allowCredentials(true);
    }
}