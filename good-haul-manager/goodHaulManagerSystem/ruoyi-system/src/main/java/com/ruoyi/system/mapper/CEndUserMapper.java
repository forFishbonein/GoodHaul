package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.CEndUser;
import com.ruoyi.system.domain.Profile;

/**
 * C端用户管理Mapper接口
 * 
 * @author ruoyi
 * @date 2024-03-31
 */
public interface CEndUserMapper 
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
     * 删除C端用户管理
     * 
     * @param id C端用户管理主键
     * @return 结果
     */
    public int deleteCEndUserById(String id);

    /**
     * 批量删除C端用户管理
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteCEndUserByIds(String[] ids);

    /**
     * 批量删除${subTable.functionName}
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteProfileByIds(String[] ids);
    
    /**
     * 批量新增${subTable.functionName}
     * 
     * @param profileList ${subTable.functionName}列表
     * @return 结果
     */
    public int batchProfile(List<Profile> profileList);
    

    /**
     * 通过C端用户管理主键删除${subTable.functionName}信息
     * 
     * @param id C端用户管理ID
     * @return 结果
     */
    public int deleteProfileById(String id);
}
