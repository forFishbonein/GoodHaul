package com.ruoyi.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * B端司机管理对象 driver
 * 
 * @author Hao
 * @date 2024-03-31
 */
public class Driver extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @Excel(name = "编号")
    private String id;

    /** 账号 */
    @Excel(name = "账号")
    private String account;

    /** 密码 */
    @Excel(name = "密码")
    private String password;

    /** 姓名 */
    @Excel(name = "姓名")
    private String name;

    /** 手机号 */
    @Excel(name = "手机号")
    private String phone;

    /** 完成订单总数 */
    @Excel(name = "完成订单总数")
    private Long finishOrderNumber;

    /** 上次登录时间 */
    @Excel(name = "上次登录时间")
    private String lastLoginTime;

    /** 上次订单完成时间 */
    @Excel(name = "上次订单完成时间")
    private String lastFinishTime;

    /** 账号创建时间 */
    @Excel(name = "账号创建时间")
    private String accountCreateTime;

    /** 司机类型 */
    @Excel(name = "司机类型")
    private String driverType;

    /** 类型 */
    @Excel(name = "类型")
    private String type;

    public void setId(String id) 
    {
        this.id = id;
    }

    public String getId() 
    {
        return id;
    }
    public void setAccount(String account) 
    {
        this.account = account;
    }

    public String getAccount() 
    {
        return account;
    }
    public void setPassword(String password) 
    {
        this.password = password;
    }

    public String getPassword() 
    {
        return password;
    }
    public void setName(String name) 
    {
        this.name = name;
    }

    public String getName() 
    {
        return name;
    }
    public void setPhone(String phone) 
    {
        this.phone = phone;
    }

    public String getPhone() 
    {
        return phone;
    }
    public void setFinishOrderNumber(Long finishOrderNumber) 
    {
        this.finishOrderNumber = finishOrderNumber;
    }

    public Long getFinishOrderNumber() 
    {
        return finishOrderNumber;
    }
    public void setLastLoginTime(String lastLoginTime) 
    {
        this.lastLoginTime = lastLoginTime;
    }

    public String getLastLoginTime() 
    {
        return lastLoginTime;
    }
    public void setLastFinishTime(String lastFinishTime) 
    {
        this.lastFinishTime = lastFinishTime;
    }

    public String getLastFinishTime() 
    {
        return lastFinishTime;
    }
    public void setAccountCreateTime(String accountCreateTime) 
    {
        this.accountCreateTime = accountCreateTime;
    }

    public String getAccountCreateTime() 
    {
        return accountCreateTime;
    }
    public void setDriverType(String driverType) 
    {
        this.driverType = driverType;
    }

    public String getDriverType() 
    {
        return driverType;
    }
    public void setType(String type) 
    {
        this.type = type;
    }

    public String getType() 
    {
        return type;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("account", getAccount())
            .append("password", getPassword())
            .append("name", getName())
            .append("phone", getPhone())
            .append("finishOrderNumber", getFinishOrderNumber())
            .append("lastLoginTime", getLastLoginTime())
            .append("lastFinishTime", getLastFinishTime())
            .append("accountCreateTime", getAccountCreateTime())
            .append("driverType", getDriverType())
            .append("type", getType())
            .toString();
    }
}
