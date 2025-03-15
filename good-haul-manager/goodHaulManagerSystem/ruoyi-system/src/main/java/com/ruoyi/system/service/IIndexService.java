package com.ruoyi.system.service;


import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.service.impl.util.DateObject;
import com.ruoyi.system.service.impl.util.IndexObject;
import com.ruoyi.system.service.impl.util.OrderCountByDay;

import java.util.List;
import java.util.Map;

public interface IIndexService {

    public int visitNumberIncrease();
    public IndexObject getIndexNumber();
    public Map<String,Integer> getLineData();
    public Map<String, Map<String, Integer>> getRaddarData();
    public Map<String, Integer> getPieData();
//    public List<DateObject> getBarData();
}
