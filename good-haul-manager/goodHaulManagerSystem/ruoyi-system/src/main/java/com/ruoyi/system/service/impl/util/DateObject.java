package com.ruoyi.system.service.impl.util;

import java.util.Date;

public class DateObject {
    private Date date;
    private int count;

    // 构造函数、getter 和 setter 省略

    public DateObject(Date date, int count) {
        this.date = date;
        this.count = count;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}

