package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.Car;
import com.ruoyi.system.domain.Driver;

/**
 * 司机车辆管理Mapper接口
 * 
 * @author Hao
 * @date 2024-03-31
 */
public interface CarMapper 
{
    /**
     * 查询司机车辆管理
     * 
     * @param id 司机车辆管理主键
     * @return 司机车辆管理
     */
    public Car selectCarById(Long id);

    /**
     * 查询司机车辆管理列表
     * 
     * @param car 司机车辆管理
     * @return 司机车辆管理集合
     */
    public List<Car> selectCarList(Car car);

    /**
     * 新增司机车辆管理
     * 
     * @param car 司机车辆管理
     * @return 结果
     */
    public int insertCar(Car car);

    /**
     * 修改司机车辆管理
     * 
     * @param car 司机车辆管理
     * @return 结果
     */
    public int updateCar(Car car);

    /**
     * 删除司机车辆管理
     * 
     * @param id 司机车辆管理主键
     * @return 结果
     */
    public int deleteCarById(Long id);

    /**
     * 批量删除司机车辆管理
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteCarByIds(Long[] ids);

    /**
     * 批量删除B端司机管理
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteDriverByIds(Long[] ids);
    
    /**
     * 批量新增B端司机管理
     * 
     * @param driverList B端司机管理列表
     * @return 结果
     */
    public int batchDriver(List<Driver> driverList);
    

    /**
     * 通过司机车辆管理主键删除B端司机管理信息
     * 
     * @param id 司机车辆管理ID
     * @return 结果
     */
    public int deleteDriverById(Long id);
}
