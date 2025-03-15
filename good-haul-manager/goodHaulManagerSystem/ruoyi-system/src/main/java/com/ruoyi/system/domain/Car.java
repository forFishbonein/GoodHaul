package com.ruoyi.system.domain;

import java.util.List;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 司机车辆管理对象 car
 * 
 * @author Hao
 * @date 2024-03-31
 */
public class Car extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @Excel(name = "编号")
    private Long id;

    /** 车牌号 */
    @Excel(name = "车牌号")
    private String code;

    /** 颜色 */
    @Excel(name = "颜色")
    private String color;

    /** 车型 */
    @Excel(name = "车型")
    private String carType;

    /** 品牌 */
    @Excel(name = "品牌")
    private String brand;

    /** 编入时间 */
    @Excel(name = "编入时间")
    private String enrollTime;

    /** 司机编号 */
    @Excel(name = "司机编号")
    private String driverId;

    /** B端司机管理信息 */
    private List<Driver> driverList;

    public void setId(Long id) 
    {
        this.id = id;
    }

    public Long getId() 
    {
        return id;
    }
    public void setCode(String code) 
    {
        this.code = code;
    }

    public String getCode() 
    {
        return code;
    }
    public void setColor(String color) 
    {
        this.color = color;
    }

    public String getColor() 
    {
        return color;
    }
    public void setCarType(String carType) 
    {
        this.carType = carType;
    }

    public String getCarType() 
    {
        return carType;
    }
    public void setBrand(String brand) 
    {
        this.brand = brand;
    }

    public String getBrand() 
    {
        return brand;
    }
    public void setEnrollTime(String enrollTime) 
    {
        this.enrollTime = enrollTime;
    }

    public String getEnrollTime() 
    {
        return enrollTime;
    }
    public void setDriverId(String driverId) 
    {
        this.driverId = driverId;
    }

    public String getDriverId() 
    {
        return driverId;
    }

    public List<Driver> getDriverList()
    {
        return driverList;
    }

    public void setDriverList(List<Driver> driverList)
    {
        this.driverList = driverList;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("code", getCode())
            .append("color", getColor())
            .append("carType", getCarType())
            .append("brand", getBrand())
            .append("enrollTime", getEnrollTime())
            .append("driverId", getDriverId())
            .append("driverList", getDriverList())
            .toString();
    }
}
