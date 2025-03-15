package com.ruoyi.system.domain;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString //这个是必须有的，否则查询到的数据没办法转化为字符串！
@Document(collection = "chat")
public class Chat {
    @Id
    private String id;
    private String roomId;
    private ArrayList<String> historyOrderId;
    private ArrayList<String> doingOrderId;
    private Object user;
    private Object driver;
    private ArrayList<Object> content;
    private String lastChatTime;
    private String chatCreateTime;
    // Getters and setters
}
