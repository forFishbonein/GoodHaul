package com.ruoyi.system.service.impl.util;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class OrderCountByDay {
    private String day;
    private int orderCount;

    // 省略构造函数和getter/setter方法
}

