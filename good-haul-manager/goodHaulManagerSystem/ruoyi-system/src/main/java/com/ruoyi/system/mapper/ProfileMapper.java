package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.Profile;

/**
 * C端用户信息管理Mapper接口
 * 
 * @author Hao
 * @date 2024-03-31
 */
public interface ProfileMapper 
{
    /**
     * 查询C端用户信息管理
     * 
     * @param id C端用户信息管理主键
     * @return C端用户信息管理
     */
    public Profile selectProfileById(Long id);

    /**
     * 查询C端用户信息管理列表
     * 
     * @param profile C端用户信息管理
     * @return C端用户信息管理集合
     */
    public List<Profile> selectProfileList(Profile profile);

    /**
     * 新增C端用户信息管理
     * 
     * @param profile C端用户信息管理
     * @return 结果
     */
    public int insertProfile(Profile profile);

    /**
     * 修改C端用户信息管理
     * 
     * @param profile C端用户信息管理
     * @return 结果
     */
    public int updateProfile(Profile profile);

    /**
     * 删除C端用户信息管理
     * 
     * @param id C端用户信息管理主键
     * @return 结果
     */
    public int deleteProfileById(Long id);

    /**
     * 批量删除C端用户信息管理
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteProfileByIds(Long[] ids);
}
