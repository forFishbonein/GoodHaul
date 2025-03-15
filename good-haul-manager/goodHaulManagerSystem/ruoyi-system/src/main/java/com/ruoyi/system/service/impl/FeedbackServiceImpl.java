package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.FeedbackMapper;
import com.ruoyi.system.domain.Feedback;
import com.ruoyi.system.service.IFeedbackService;

/**
 * 反馈管理Service业务层处理
 *
 * @author Hao
 * @date 2024-03-31
 */
@Service
public class FeedbackServiceImpl implements IFeedbackService
{
    @Autowired
    private FeedbackMapper feedbackMapper;

    /**
     * 查询反馈管理
     *
     * @param id 反馈管理主键
     * @return 反馈管理
     */
    @Override
    public Feedback selectFeedbackById(Long id)
    {
        return feedbackMapper.selectFeedbackById(id);
    }

    /**
     * 查询反馈管理列表
     *
     * @param feedback 反馈管理
     * @return 反馈管理
     */
    @Override
    public List<Feedback> selectFeedbackList(Feedback feedback)
    {
        return feedbackMapper.selectFeedbackList(feedback);
    }

    /**
     * 新增反馈管理
     *
     * @param feedback 反馈管理
     * @return 结果
     */
    @Override
    public int insertFeedback(Feedback feedback)
    {
        return feedbackMapper.insertFeedback(feedback);
    }

    /**
     * 修改反馈管理
     *
     * @param feedback 反馈管理
     * @return 结果
     */
    @Override
    public int updateFeedback(Feedback feedback)
    {
        return feedbackMapper.updateFeedback(feedback);
    }

    /**
     * 批量删除反馈管理
     *
     * @param ids 需要删除的反馈管理主键
     * @return 结果
     */
    @Override
    public int deleteFeedbackByIds(Long[] ids)
    {
        return feedbackMapper.deleteFeedbackByIds(ids);
    }

    /**
     * 删除反馈管理信息
     *
     * @param id 反馈管理主键
     * @return 结果
     */
    @Override
    public int deleteFeedbackById(Long id)
    {
        return feedbackMapper.deleteFeedbackById(id);
    }

    @Override
    public int getFeedbackNumber() {

        return 0;
    }
}
