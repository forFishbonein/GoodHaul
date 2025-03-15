package com.ruoyi.system.service.impl;

import com.ruoyi.system.domain.Chat;
import com.ruoyi.system.domain.Order;
import com.ruoyi.system.repository.ChatRepository;
import com.ruoyi.system.service.IChatService;
import com.ruoyi.system.service.impl.util.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImpl implements IChatService {

    private final ChatRepository chatRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public ChatServiceImpl(ChatRepository chatRepository, MongoTemplate mongoTemplate) {
        this.chatRepository = chatRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Chat> getAllChats(Chat chat) {
//        System.out.println(chat);
        List<String> notNullProperties = ObjectUtils.collectNotNullProperties(chat);
        System.out.println(notNullProperties);
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();
        for (String property : notNullProperties) {
//            System.out.println(property);
            // 获取 Order 类的 Class 对象
            Class<?> clazz = chat.getClass();
            criteriaList.add(Criteria.where(property).is(ObjectUtils.getPropertyValue(chat,property)));
        }
        // 使用andOperator方法将多个条件组合成一个AND条件
        Criteria combinedCriteria = new Criteria();
        if(criteriaList.size() > 0){
            combinedCriteria.andOperator(criteriaList.toArray(new Criteria[0]));
        }
        query.addCriteria(combinedCriteria);
        List<Chat> result = mongoTemplate.find(query, Chat.class);
//        System.out.println(result);
        return result;
    }
}
