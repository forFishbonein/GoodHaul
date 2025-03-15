package com.ruoyi.system.service.impl;

import com.ruoyi.system.domain.Order;
import com.ruoyi.system.repository.OrderRepository;
import com.ruoyi.system.service.impl.util.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import com.ruoyi.system.service.IOrderService;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,MongoTemplate mongoTemplate) {
        this.orderRepository = orderRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Optional<Order> getOrderById(String id) {
        Optional<Order> result = orderRepository.findById(id);
        System.out.println(result);
        return result;
    }

    @Override
    public List<Order> getAllOrders(Order order) {
//        System.out.println(order);
        List<String> notNullProperties = ObjectUtils.collectNotNullProperties(order);
        System.out.println(notNullProperties);
//        System.out.println(notNullProperties);
//        System.out.println(nullProperties);
//        String[] ignorePaths = nullProperties.toArray(new String[0]);
//        System.out.println(ignorePaths);
//        ExampleMatcher matcher = ExampleMatcher.matching()
//                .withIgnoreNullValues() // 忽略属性为null的条件
//                .withIgnorePaths(ignorePaths);
//        Order orderObj = new Order();
//        orderObj.setDriverId("196e4677-c8b0-4ff5-98ea-0176355210ef");
//        Example<Order> orderExample = Example.of(orderObj,matcher);
//        System.out.println(orderExample);
//        List<Order> result = orderRepository.findAll(orderExample);
//        List<Order> result2 = orderRepository.findAll();
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();
        for (String property : notNullProperties) {
//            System.out.println(property);
            // 获取 Order 类的 Class 对象
            Class<?> clazz = order.getClass();
            criteriaList.add(Criteria.where(property).is(ObjectUtils.getPropertyValue(order,property)));
        }
        // 使用andOperator方法将多个条件组合成一个AND条件
        Criteria combinedCriteria = new Criteria();
        if(criteriaList.size() > 0){
            combinedCriteria.andOperator(criteriaList.toArray(new Criteria[0]));
        }
        query.addCriteria(combinedCriteria);
        List<Order> result = mongoTemplate.find(query, Order.class);
//        System.out.println(result);
        return result;
    }

    @Override
    public int createOrder(Order order) {
        Order result = orderRepository.save(order);
        return 1;
    }

    @Override
    public int updateOrder(Order order) {
        Order result =  orderRepository.save(order);
        return 1;
    }

    @Override
    public void deleteOrderById(String id) {

        orderRepository.deleteById(id);
    }

    @Override
    public void deleteAllOrdersByIds(List<String> ids) {
        for (String id : ids) {
            orderRepository.deleteById(id);
            // 输出其他属性...
        }
//        orderRepository.deleteAllByIdIn(ids);
    }
}
