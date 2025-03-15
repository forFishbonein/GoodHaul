package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.CarMapper;
import com.ruoyi.system.domain.Car;
import com.ruoyi.system.service.ICarService;

/**
 * 司机车辆管理Service业务层处理
 * 
 * @author Hao
 * @date 2024-03-31
 */
@Service
public class CarServiceImpl implements ICarService 
{
    @Autowired
    private CarMapper carMapper;

    /**
     * 查询司机车辆管理
     * 
     * @param id 司机车辆管理主键
     * @return 司机车辆管理
     */
    @Override
    public Car selectCarById(Long id)
    {
        return carMapper.selectCarById(id);
    }

    /**
     * 查询司机车辆管理列表
     * 
     * @param car 司机车辆管理
     * @return 司机车辆管理
     */
    @Override
    public List<Car> selectCarList(Car car)
    {
        return carMapper.selectCarList(car);
    }

    /**
     * 新增司机车辆管理
     * 
     * @param car 司机车辆管理
     * @return 结果
     */
    @Override
    public int insertCar(Car car)
    {
        return carMapper.insertCar(car);
    }

    /**
     * 修改司机车辆管理
     * 
     * @param car 司机车辆管理
     * @return 结果
     */
    @Override
    public int updateCar(Car car)
    {
        return carMapper.updateCar(car);
    }

    /**
     * 批量删除司机车辆管理
     * 
     * @param ids 需要删除的司机车辆管理主键
     * @return 结果
     */
    @Override
    public int deleteCarByIds(Long[] ids)
    {
        return carMapper.deleteCarByIds(ids);
    }

    /**
     * 删除司机车辆管理信息
     * 
     * @param id 司机车辆管理主键
     * @return 结果
     */
    @Override
    public int deleteCarById(Long id)
    {
        return carMapper.deleteCarById(id);
    }
}
