package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.Driver;

/**
 * B端司机管理Mapper接口
 * 
 * @author Hao
 * @date 2024-03-31
 */
public interface DriverMapper 
{
    /**
     * 查询B端司机管理
     * 
     * @param id B端司机管理主键
     * @return B端司机管理
     */
    public Driver selectDriverById(String id);

    /**
     * 查询B端司机管理列表
     * 
     * @param driver B端司机管理
     * @return B端司机管理集合
     */
    public List<Driver> selectDriverList(Driver driver);

    /**
     * 新增B端司机管理
     * 
     * @param driver B端司机管理
     * @return 结果
     */
    public int insertDriver(Driver driver);

    /**
     * 修改B端司机管理
     * 
     * @param driver B端司机管理
     * @return 结果
     */
    public int updateDriver(Driver driver);

    /**
     * 删除B端司机管理
     * 
     * @param id B端司机管理主键
     * @return 结果
     */
    public int deleteDriverById(String id);

    /**
     * 批量删除B端司机管理
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteDriverByIds(String[] ids);
}
