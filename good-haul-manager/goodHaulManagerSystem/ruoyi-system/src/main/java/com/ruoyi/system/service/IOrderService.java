package com.ruoyi.system.service;

import com.ruoyi.system.domain.Order;

import java.util.List;
import java.util.Optional;

public interface IOrderService {

    Optional<Order> getOrderById(String id);

    List<Order> getAllOrders(Order order);

    int createOrder(Order order);

    int updateOrder(Order order);

    void deleteOrderById(String id);

    void deleteAllOrdersByIds(List<String> ids);
}
