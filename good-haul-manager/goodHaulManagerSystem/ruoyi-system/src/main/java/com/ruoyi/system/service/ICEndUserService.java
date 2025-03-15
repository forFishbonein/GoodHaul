package com.ruoyi.system.service;

import java.util.List;
import com.ruoyi.system.domain.CEndUser;

/**
 * C端用户管理Service接口
 * 
 * @author ruoyi
 * @date 2024-03-31
 */
public interface ICEndUserService 
{
    /**
     * 查询C端用户管理
     * 
     * @param id C端用户管理主键
     * @return C端用户管理
     */
    public CEndUser selectCEndUserById(String id);

    /**
     * 查询C端用户管理列表
     * 
     * @param cEndUser C端用户管理
     * @return C端用户管理集合
     */
    public List<CEndUser> selectCEndUserList(CEndUser cEndUser);

    /**
     * 新增C端用户管理
     * 
     * @param cEndUser C端用户管理
     * @return 结果
     */
    public int insertCEndUser(CEndUser cEndUser);

    /**
     * 修改C端用户管理
     * 
     * @param cEndUser C端用户管理
     * @return 结果
     */
    public int updateCEndUser(CEndUser cEndUser);

    /**
     * 批量删除C端用户管理
     * 
     * @param ids 需要删除的C端用户管理主键集合
     * @return 结果
     */
    public int deleteCEndUserByIds(String[] ids);

    /**
     * 删除C端用户管理信息
     * 
     * @param id C端用户管理主键
     * @return 结果
     */
    public int deleteCEndUserById(String id);
}
