package com.ruoyi.system.domain;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@ToString //这个是必须有的，否则查询到的数据没办法转化为字符串！
@Document(collection = "moveorder")
public class Order {
    @Id
    private String id;
    private String userId;
    private String chatId;
    private Object address;
    private String carType;
    private Number distance;
    private Number peopleNumber;
    private Number price;
    private String remark;
    private String time;
    private String status;
    private String driverId;
    private Number carId;
    private Number confirmCode;
    private String createTime;
    private String updateTime;
    private Number extraPrice;
    private String serviceType;
    private Number paidPrice;
    private String finishTime;
    private String completePayTime;
    private Number needRefund;
    // Getters and setters
}
