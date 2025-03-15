package com.ruoyi.system.service.impl.util;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class IndexObject implements Serializable {
    // 定义属性
    private Long visitNumber;
    private Long feedbackNumber;
    private Long orderNumber;
    private Long totalPaidPrice;

    // 构造函数
    public IndexObject(Long visitNumber, Long feedbackNumber, Long orderNumber, Long totalPaidPrice) {
        this.visitNumber = visitNumber;
        this.feedbackNumber = feedbackNumber;
        this.orderNumber = orderNumber;
        this.totalPaidPrice = totalPaidPrice;
    }
}
