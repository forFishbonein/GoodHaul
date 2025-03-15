package com.ruoyi.system.domain;

import java.util.List;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 反馈管理对象 feedback
 * 
 * @author Hao
 * @date 2024-03-31
 */
public class Feedback extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @Excel(name = "编号")
    private Long id;

    /** 订单编号 */
    @Excel(name = "订单编号")
    private String orderId;

    /** 用户手机号 */
    @Excel(name = "用户手机号")
    private String userPhone;

    /** 反馈内容 */
    @Excel(name = "反馈内容")
    private String content;

    /** 反馈时间 */
    @Excel(name = "反馈时间")
    private String feedbackTime;

    /** 处理状态 */
    @Excel(name = "处理状态")
    private String status;

    /** 处理结果 */
    @Excel(name = "处理结果")
    private String handleResult;

    /** 处理完成时间 */
    @Excel(name = "处理完成时间")
    private String finishTime;

    /** 司机编号 */
    @Excel(name = "司机编号")
    private String driverId;

    /** 用户编号 */
    @Excel(name = "用户编号")
    private String userId;

    /** 骑手编号 */
    @Excel(name = "骑手编号")
    private String riderId;

    /** 处理人员 */
    @Excel(name = "处理人员")
    private String handleStaff;

    /** C端用户管理信息 */
    private List<CEndUser> cEndUserList;

    public void setId(Long id) 
    {
        this.id = id;
    }

    public Long getId() 
    {
        return id;
    }
    public void setOrderId(String orderId) 
    {
        this.orderId = orderId;
    }

    public String getOrderId() 
    {
        return orderId;
    }
    public void setUserPhone(String userPhone) 
    {
        this.userPhone = userPhone;
    }

    public String getUserPhone() 
    {
        return userPhone;
    }
    public void setContent(String content) 
    {
        this.content = content;
    }

    public String getContent() 
    {
        return content;
    }
    public void setFeedbackTime(String feedbackTime) 
    {
        this.feedbackTime = feedbackTime;
    }

    public String getFeedbackTime() 
    {
        return feedbackTime;
    }
    public void setStatus(String status) 
    {
        this.status = status;
    }

    public String getStatus() 
    {
        return status;
    }
    public void setHandleResult(String handleResult) 
    {
        this.handleResult = handleResult;
    }

    public String getHandleResult() 
    {
        return handleResult;
    }
    public void setFinishTime(String finishTime) 
    {
        this.finishTime = finishTime;
    }

    public String getFinishTime() 
    {
        return finishTime;
    }
    public void setDriverId(String driverId) 
    {
        this.driverId = driverId;
    }

    public String getDriverId() 
    {
        return driverId;
    }
    public void setUserId(String userId) 
    {
        this.userId = userId;
    }

    public String getUserId() 
    {
        return userId;
    }
    public void setRiderId(String riderId) 
    {
        this.riderId = riderId;
    }

    public String getRiderId() 
    {
        return riderId;
    }
    public void setHandleStaff(String handleStaff) 
    {
        this.handleStaff = handleStaff;
    }

    public String getHandleStaff() 
    {
        return handleStaff;
    }

    public List<CEndUser> getCEndUserList()
    {
        return cEndUserList;
    }

    public void setCEndUserList(List<CEndUser> cEndUserList)
    {
        this.cEndUserList = cEndUserList;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("orderId", getOrderId())
            .append("userPhone", getUserPhone())
            .append("content", getContent())
            .append("feedbackTime", getFeedbackTime())
            .append("status", getStatus())
            .append("handleResult", getHandleResult())
            .append("finishTime", getFinishTime())
            .append("driverId", getDriverId())
            .append("userId", getUserId())
            .append("riderId", getRiderId())
            .append("handleStaff", getHandleStaff())
            .append("cEndUserList", getCEndUserList())
            .toString();
    }
}
