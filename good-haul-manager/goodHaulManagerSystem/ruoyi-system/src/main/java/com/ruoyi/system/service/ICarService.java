package com.ruoyi.system.service;

import java.util.List;
import com.ruoyi.system.domain.Car;

/**
 * 司机车辆管理Service接口
 * 
 * @author Hao
 * @date 2024-03-31
 */
public interface ICarService 
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
     * 批量删除司机车辆管理
     * 
     * @param ids 需要删除的司机车辆管理主键集合
     * @return 结果
     */
    public int deleteCarByIds(Long[] ids);

    /**
     * 删除司机车辆管理信息
     * 
     * @param id 司机车辆管理主键
     * @return 结果
     */
    public int deleteCarById(Long id);
}
