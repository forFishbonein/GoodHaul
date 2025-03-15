package com.ruoyi.system.service.impl;

import com.ruoyi.system.mapper.FeedbackMapper;
import com.ruoyi.system.repository.OrderRepository;
import com.ruoyi.system.service.IIndexService;
import com.ruoyi.system.service.impl.util.DateObject;
import com.ruoyi.system.service.impl.util.IndexObject;
import com.ruoyi.system.service.impl.util.OrderCountByDay;
import com.ruoyi.system.service.impl.util.ResultClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.aggregation.AggregationExpression;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class IndexServiceImpl  implements IIndexService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private FeedbackMapper feedbackMapper;

    @Autowired
    private MongoTemplate mongoTemplate;

    private final OrderRepository orderRepository;

    public IndexServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    @Override
    public int visitNumberIncrease()
    {
        if(Boolean.TRUE.equals(redisTemplate.hasKey("visitNumber"))){
            ValueOperations<String, String> ops = redisTemplate.opsForValue();
            String valueStr = ops.get("visitNumber");
            assert valueStr != null;
            long value = Long.parseLong(valueStr);
            ops.set("visitNumber", String.valueOf(value+1));
        }else{
            ValueOperations<String, String> ops = redisTemplate.opsForValue();
            ops.set("visitNumber", "1");
        }
        return 1;
    }

    @Override
    public IndexObject getIndexNumber(){
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        Long visitNumber = Long.parseLong(ops.get("visitNumber"));
        int feedbackNumber = feedbackMapper.getFeedbackNumber();
        Long orderNumber =  orderRepository.count();
        GroupOperation groupOperation = Aggregation.group().sum("paidPrice").as("totalPaidPrice");
        Aggregation aggregation = newAggregation(groupOperation);

        AggregationResults<ResultClass> result = mongoTemplate.aggregate(aggregation, "moveorder", ResultClass.class);
        ResultClass resultClass = result.getUniqueMappedResult();
        double totalPaidPrice = 0;
        if (resultClass != null) {
            totalPaidPrice = resultClass.getTotalPaidPrice();
        } else {
            System.out.println("No documents found");
        }
        return new IndexObject(visitNumber, (long) feedbackNumber, orderNumber, Math.round(totalPaidPrice));
    }
    @Override
    public Map<String,Integer> getLineData() {
//        // 获取当前日期
//        LocalDate endDateStr = LocalDate.now();
//
//        // 构建查询条件，获取近七天的数据
//        LocalDate startDateStr = endDateStr.minusDays(6);
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        String startDateStr = oneWeekAgo.format(formatter);
//        String endDateStr = currentDate.format(formatter);
//        System.out.println(startDateStr);
//        System.out.println(endDateStr);
        // 聚合查询
//        Aggregation aggregation = Aggregation.newAggregation(
//                Aggregation.match(
//                        Criteria.where("createTime").gte(startDateStr).lte(endDateStr)
//                ),
//                Aggregation.project()
//                        .andExpression("{$dateFromString: { dateString: { $regexFind: { input: '$createTime', regex: '\\d{4}-\\d{2}-\\d{2}' }}").as("formattedCreateTime"),
//                Aggregation.group("formattedCreateTime").count().as("orderCount")
//        );
        // 执行聚合查询
//        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "moveorder", Map.class);
//        System.out.println(results);
//        Map<String, Long> orderCountByDay = new HashMap<>();
//        for (Map<String, Object> result : results.getMappedResults()) {
//            String createTime = (String) result.get("_id");
//            Long orderCount = (Long) result.get("orderCount");
//            orderCountByDay.put(createTime, orderCount);
//        }
//        System.out.println(orderCountByDay);
//        return orderCountByDay;
        // 聚合查询
        Aggregation aggregation = newAggregation(
                Aggregation.group("carType").count().as("orderCount")
        );

        // 执行聚合查询
        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "moveorder", Map.class);
        Map<String, Integer> orderCountByCarType = new HashMap<>();
        for (Map<String, Object> result : results.getMappedResults()) {
            String carType = (String) result.get("_id");
            Integer orderCount = ((Number) result.get("orderCount")).intValue();
            orderCountByCarType.put(carType, orderCount);
        }
        System.out.println(orderCountByCarType);
        return orderCountByCarType;
    }
    public Map<String, Map<String, Integer>> getRaddarData() {
        // 定义聚合查询
        Aggregation aggregation = newAggregation(
                match(
                        new Criteria().orOperator(
                                Criteria.where("status").is("wait-paydeposit"),
                                Criteria.where("status").is("wait-receive"),
                                Criteria.where("status").is("on-way"),
                                Criteria.where("status").is("load-transport"),
                                Criteria.where("status").is("wait-payremain"),
                                Criteria.where("status").is("finished"),
                                Criteria.where("status").is("canceled")
                        )
                ),
                Aggregation.group("carType", "status").count().as("orderCount")
        );

        // 执行聚合查询
        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "moveorder", Map.class);

        // 处理结果
        Map<String, Map<String, Integer>> orderCountsByCarTypeAndStatus = new HashMap<>();
        for (Map<String, Object> result : results.getMappedResults()) {
            Map<String, Object> id = (Map<String, Object>) result.get("_id");
            String carType = (String) id.get("carType");
            String status = (String) id.get("status");
            Integer orderCount = (Integer) result.get("orderCount");
            // 获取当前状态对应的Map，如果不存在则创建
            Map<String, Integer> statusCounts = orderCountsByCarTypeAndStatus.computeIfAbsent(carType, k -> new HashMap<>());
            // 将订单数量放入对应状态的Map中
            statusCounts.put(status, orderCount);
        }
        System.out.println(orderCountsByCarTypeAndStatus);
        return orderCountsByCarTypeAndStatus;
    }

    public Map<String, Integer> getPieData() {
        // 定义聚合查询
        Aggregation aggregation = newAggregation(
                Aggregation.group("status").count().as("orderCount")
        );

        // 执行聚合查询
        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "moveorder", Map.class);

        // 处理结果
        Map<String, Integer> orderCountsByStatus = new HashMap<>();
        for (Map<String, Object> result : results.getMappedResults()) {
            String status = (String) result.get("_id");
            Integer orderCount = (Integer) result.get("orderCount");

            // 检查键是否为null
            if (status != null) {
                orderCountsByStatus.put(status, orderCount);
            }
        }
        System.out.println(orderCountsByStatus);
        return orderCountsByStatus;
    }
//    public List<DateObject> getBarData() {
//// 定义聚合管道
//        Aggregation aggregation = Aggregation.newAggregation(
//                // 将时间属性从字符串转换为日期类型
//                Aggregation.project()
//                        .andExpression("{$dateFromString: {dateString: '$time'}}").as("date"),
//                // 将日期格式化为年月日的形式
////                Aggregation.project()
////                        .andExpression("{$dateToString: {format: '%Y-%m-%d', date: '$date'}}").as("formattedDate"),
//                // 根据时间属性进行分组
//                Aggregation.group("date").count().as("count"),
////                // 按照数量降序排序
////                Aggregation.sort(Aggregation.desc("count")),
//                // 取前7个
//                Aggregation.limit(7)
//        );
//
//        // 执行聚合操作
//        AggregationResults<DateObject> results = mongoTemplate.aggregate(aggregation, "moveorder", DateObject.class);
//        System.out.println(results.getMappedResults());
//        // 获取结果
//        return results.getMappedResults();
//    }
}
