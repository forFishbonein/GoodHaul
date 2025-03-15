//package com.ruoyi.system.domain;
//
//import org.apache.commons.lang3.builder.ToStringBuilder;
//import org.apache.commons.lang3.builder.ToStringStyle;
//import com.ruoyi.common.annotation.Excel;
//import com.ruoyi.common.core.domain.BaseEntity;
//
///**
// * ${subTable.functionName}对象 profile
// *
// * @author ruoyi
// * @date 2024-03-31
// */
//public class Profile extends BaseEntity
//{
//    private static final long serialVersionUID = 1L;
//
//    /** $column.columnComment */
//    private Long id;
//
//    /** $column.columnComment */
//    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
//    private String name;
//
//    /** $column.columnComment */
//    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
//    private String gender;
//
//    /** $column.columnComment */
//    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
//    private String sign;
//
//    /** $column.columnComment */
//    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
//    private String avatar;
//
//    public void setId(Long id)
//    {
//        this.id = id;
//    }
//
//    public Long getId()
//    {
//        return id;
//    }
//    public void setName(String name)
//    {
//        this.name = name;
//    }
//
//    public String getName()
//    {
//        return name;
//    }
//    public void setGender(String gender)
//    {
//        this.gender = gender;
//    }
//
//    public String getGender()
//    {
//        return gender;
//    }
//    public void setSign(String sign)
//    {
//        this.sign = sign;
//    }
//
//    public String getSign()
//    {
//        return sign;
//    }
//    public void setAvatar(String avatar)
//    {
//        this.avatar = avatar;
//    }
//
//    public String getAvatar()
//    {
//        return avatar;
//    }
//
//    @Override
//    public String toString() {
//        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
//            .append("id", getId())
//            .append("name", getName())
//            .append("gender", getGender())
//            .append("sign", getSign())
//            .append("avatar", getAvatar())
//            .toString();
//    }
//}
package com.ruoyi.system.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * C端用户信息管理对象 profile
 *
 * @author Hao
 * @date 2024-03-31
 */
public class Profile extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @Excel(name = "编号")
    private Long id;

    /** 昵称 */
    @Excel(name = "昵称")
    private String name;

    /** 性别 */
    @Excel(name = "性别")
    private String gender;

    /** 个性签名 */
    @Excel(name = "个性签名")
    private String sign;

    /** 头像 */
    @Excel(name = "头像")
    private String avatar;

    public void setId(Long id)
    {
        this.id = id;
    }

    public Long getId()
    {
        return id;
    }
    public void setName(String name)
    {
        this.name = name;
    }

    public String getName()
    {
        return name;
    }
    public void setGender(String gender)
    {
        this.gender = gender;
    }

    public String getGender()
    {
        return gender;
    }
    public void setSign(String sign)
    {
        this.sign = sign;
    }

    public String getSign()
    {
        return sign;
    }
    public void setAvatar(String avatar)
    {
        this.avatar = avatar;
    }

    public String getAvatar()
    {
        return avatar;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
                .append("id", getId())
                .append("name", getName())
                .append("gender", getGender())
                .append("sign", getSign())
                .append("avatar", getAvatar())
                .toString();
    }
}
