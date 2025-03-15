package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.ProfileMapper;
import com.ruoyi.system.domain.Profile;
import com.ruoyi.system.service.IProfileService;

/**
 * C端用户信息管理Service业务层处理
 * 
 * @author Hao
 * @date 2024-03-31
 */
@Service
public class ProfileServiceImpl implements IProfileService 
{
    @Autowired
    private ProfileMapper profileMapper;

    /**
     * 查询C端用户信息管理
     * 
     * @param id C端用户信息管理主键
     * @return C端用户信息管理
     */
    @Override
    public Profile selectProfileById(Long id)
    {
        return profileMapper.selectProfileById(id);
    }

    /**
     * 查询C端用户信息管理列表
     * 
     * @param profile C端用户信息管理
     * @return C端用户信息管理
     */
    @Override
    public List<Profile> selectProfileList(Profile profile)
    {
        return profileMapper.selectProfileList(profile);
    }

    /**
     * 新增C端用户信息管理
     * 
     * @param profile C端用户信息管理
     * @return 结果
     */
    @Override
    public int insertProfile(Profile profile)
    {
        return profileMapper.insertProfile(profile);
    }

    /**
     * 修改C端用户信息管理
     * 
     * @param profile C端用户信息管理
     * @return 结果
     */
    @Override
    public int updateProfile(Profile profile)
    {
        return profileMapper.updateProfile(profile);
    }

    /**
     * 批量删除C端用户信息管理
     * 
     * @param ids 需要删除的C端用户信息管理主键
     * @return 结果
     */
    @Override
    public int deleteProfileByIds(Long[] ids)
    {
        return profileMapper.deleteProfileByIds(ids);
    }

    /**
     * 删除C端用户信息管理信息
     * 
     * @param id C端用户信息管理主键
     * @return 结果
     */
    @Override
    public int deleteProfileById(Long id)
    {
        return profileMapper.deleteProfileById(id);
    }
}
