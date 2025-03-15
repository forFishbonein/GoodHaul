package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.CEndUserMapper;
import com.ruoyi.system.domain.CEndUser;
import com.ruoyi.system.service.ICEndUserService;

/**
 * C端用户管理Service业务层处理
 * 
 * @author ruoyi
 * @date 2024-03-31
 */
@Service
public class CEndUserServiceImpl implements ICEndUserService 
{
    @Autowired
    private CEndUserMapper cEndUserMapper;

    /**
     * 查询C端用户管理
     * 
     * @param id C端用户管理主键
     * @return C端用户管理
     */
    @Override
    public CEndUser selectCEndUserById(String id)
    {
        return cEndUserMapper.selectCEndUserById(id);
    }

    /**
     * 查询C端用户管理列表
     * 
     * @param cEndUser C端用户管理
     * @return C端用户管理
     */
    @Override
    public List<CEndUser> selectCEndUserList(CEndUser cEndUser)
    {
        return cEndUserMapper.selectCEndUserList(cEndUser);
    }

    /**
     * 新增C端用户管理
     * 
     * @param cEndUser C端用户管理
     * @return 结果
     */
    @Override
    public int insertCEndUser(CEndUser cEndUser)
    {
        return cEndUserMapper.insertCEndUser(cEndUser);
    }

    /**
     * 修改C端用户管理
     * 
     * @param cEndUser C端用户管理
     * @return 结果
     */
    @Override
    public int updateCEndUser(CEndUser cEndUser)
    {
        return cEndUserMapper.updateCEndUser(cEndUser);
    }

    /**
     * 批量删除C端用户管理
     * 
     * @param ids 需要删除的C端用户管理主键
     * @return 结果
     */
    @Override
    public int deleteCEndUserByIds(String[] ids)
    {
        return cEndUserMapper.deleteCEndUserByIds(ids);
    }

    /**
     * 删除C端用户管理信息
     * 
     * @param id C端用户管理主键
     * @return 结果
     */
    @Override
    public int deleteCEndUserById(String id)
    {
        return cEndUserMapper.deleteCEndUserById(id);
    }
}
