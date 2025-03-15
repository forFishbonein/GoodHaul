package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.Feedback;
import com.ruoyi.system.domain.CEndUser;

/**
 * 反馈管理Mapper接口
 *
 * @author Hao
 * @date 2024-03-31
 */
public interface FeedbackMapper
{
    /**
     * 查询反馈管理
     *
     * @param id 反馈管理主键
     * @return 反馈管理
     */
    public Feedback selectFeedbackById(Long id);

    /**
     * 查询反馈管理列表
     *
     * @param feedback 反馈管理
     * @return 反馈管理集合
     */
    public List<Feedback> selectFeedbackList(Feedback feedback);

    /**
     * 新增反馈管理
     *
     * @param feedback 反馈管理
     * @return 结果
     */
    public int insertFeedback(Feedback feedback);

    /**
     * 修改反馈管理
     *
     * @param feedback 反馈管理
     * @return 结果
     */
    public int updateFeedback(Feedback feedback);

    /**
     * 删除反馈管理
     *
     * @param id 反馈管理主键
     * @return 结果
     */
    public int deleteFeedbackById(Long id);

    /**
     * 批量删除反馈管理
     *
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteFeedbackByIds(Long[] ids);

    /**
     * 批量删除C端用户管理
     *
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteCEndUserByIds(Long[] ids);

    /**
     * 批量新增C端用户管理
     *
     * @param cEndUserList C端用户管理列表
     * @return 结果
     */
    public int batchCEndUser(List<CEndUser> cEndUserList);


    /**
     * 通过反馈管理主键删除C端用户管理信息
     *
     * @param id 反馈管理ID
     * @return 结果
     */
    public int deleteCEndUserById(Long id);

    public int getFeedbackNumber();
}
