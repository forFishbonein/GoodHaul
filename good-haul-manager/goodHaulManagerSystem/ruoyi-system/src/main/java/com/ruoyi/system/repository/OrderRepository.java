package com.ruoyi.system.repository;
import com.ruoyi.system.domain.Order;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    /**
     * 查询订单
     *
     * @param id 订单主键
     * @return 订单
     */
//    public Optional<Order> findById(String id);

    /**
     * 查询订单列表
     *
     * @return 订单集合
     */
//    public List<Order> findAll(Example<Order> orderExample);

    /**
     * 新增订单
     *
     * @param order 订单
     * @return 结果
     */
//    @Override
//    public Order save(Order order);
    /**
     * 删除订单
     *
     * @param id 订单主键
     * @return 结果
     */
//    public void deleteById(String id);

    /**
     * 批量删除订单
     *
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
//    public void deleteAllByIdIn(List<String> ids);
}
