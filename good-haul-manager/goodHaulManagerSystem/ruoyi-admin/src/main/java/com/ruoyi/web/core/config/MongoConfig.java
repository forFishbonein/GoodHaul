package com.ruoyi.web.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import com.mongodb.client.MongoClients;
import org.springframework.core.env.Environment;

@Configuration
public class MongoConfig {
    private final Environment env;

    public MongoConfig(Environment env) {
        this.env = env;
    }
    @Bean
    public MongoTemplate mongoTemplate() {
        String connectionString = env.getProperty("spring.data.mongodb.uri");
        assert connectionString != null;
        return new MongoTemplate(MongoClients.create(connectionString), "goodHaul"); //这里database名字重复无所谓的！
    }
}
