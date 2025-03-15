package com.ruoyi.system.domain;

import java.util.List;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * C端用户管理对象 user
 * 
 * @author ruoyi
 * @date 2024-03-31
 */
public class CEndUser extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @Excel(name = "编号")
    private String id;

    /** 手机号 */
    @Excel(name = "手机号")
    private String phone;

    /** 密码 */
    @Excel(name = "密码")
    private String password;

    /** 上次登陆时间 */
    @Excel(name = "上次登陆时间")
    private String lastLoginTime;

    /** 上次改密时间 */
    @Excel(name = "上次改密时间")
    private String passwordUpdateTime;

    /** 账号创建时间 */
    @Excel(name = "账号创建时间")
    private String accountCreateTime;

    /** 类型 */
    @Excel(name = "类型")
    private String type;

    /** 个人信息id */
    @Excel(name = "个人信息id")
    private Long profileId;

    /** $table.subTable.functionName信息 */
    private List<Profile> profileList;

    public void setId(String id) 
    {
        this.id = id;
    }

    public String getId() 
    {
        return id;
    }
    public void setPhone(String phone) 
    {
        this.phone = phone;
    }

    public String getPhone() 
    {
        return phone;
    }
    public void setPassword(String password) 
    {
        this.password = password;
    }

    public String getPassword() 
    {
        return password;
    }
    public void setLastLoginTime(String lastLoginTime) 
    {
        this.lastLoginTime = lastLoginTime;
    }

    public String getLastLoginTime() 
    {
        return lastLoginTime;
    }
    public void setPasswordUpdateTime(String passwordUpdateTime) 
    {
        this.passwordUpdateTime = passwordUpdateTime;
    }

    public String getPasswordUpdateTime() 
    {
        return passwordUpdateTime;
    }
    public void setAccountCreateTime(String accountCreateTime) 
    {
        this.accountCreateTime = accountCreateTime;
    }

    public String getAccountCreateTime() 
    {
        return accountCreateTime;
    }
    public void setType(String type) 
    {
        this.type = type;
    }

    public String getType() 
    {
        return type;
    }
    public void setProfileId(Long profileId) 
    {
        this.profileId = profileId;
    }

    public Long getProfileId() 
    {
        return profileId;
    }

    public List<Profile> getProfileList()
    {
        return profileList;
    }

    public void setProfileList(List<Profile> profileList)
    {
        this.profileList = profileList;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("phone", getPhone())
            .append("password", getPassword())
            .append("lastLoginTime", getLastLoginTime())
            .append("passwordUpdateTime", getPasswordUpdateTime())
            .append("accountCreateTime", getAccountCreateTime())
            .append("type", getType())
            .append("profileId", getProfileId())
            .append("profileList", getProfileList())
            .toString();
    }
}
