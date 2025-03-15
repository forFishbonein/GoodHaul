package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.DriverMapper;
import com.ruoyi.system.domain.Driver;
import com.ruoyi.system.service.IDriverService;

/**
 * B端司机管理Service业务层处理
 * 
 * @author Hao
 * @date 2024-03-31
 */
@Service
public class DriverServiceImpl implements IDriverService 
{
    @Autowired
    private DriverMapper driverMapper;

    /**
     * 查询B端司机管理
     * 
     * @param id B端司机管理主键
     * @return B端司机管理
     */
    @Override
    public Driver selectDriverById(String id)
    {
        return driverMapper.selectDriverById(id);
    }

    /**
     * 查询B端司机管理列表
     * 
     * @param driver B端司机管理
     * @return B端司机管理
     */
    @Override
    public List<Driver> selectDriverList(Driver driver)
    {
        return driverMapper.selectDriverList(driver);
    }

    /**
     * 新增B端司机管理
     * 
     * @param driver B端司机管理
     * @return 结果
     */
    @Override
    public int insertDriver(Driver driver)
    {
        return driverMapper.insertDriver(driver);
    }

    /**
     * 修改B端司机管理
     * 
     * @param driver B端司机管理
     * @return 结果
     */
    @Override
    public int updateDriver(Driver driver)
    {
        return driverMapper.updateDriver(driver);
    }

    /**
     * 批量删除B端司机管理
     * 
     * @param ids 需要删除的B端司机管理主键
     * @return 结果
     */
    @Override
    public int deleteDriverByIds(String[] ids)
    {
        return driverMapper.deleteDriverByIds(ids);
    }

    /**
     * 删除B端司机管理信息
     * 
     * @param id B端司机管理主键
     * @return 结果
     */
    @Override
    public int deleteDriverById(String id)
    {
        return driverMapper.deleteDriverById(id);
    }
}
