package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.RiderMapper;
import com.ruoyi.system.domain.Rider;
import com.ruoyi.system.service.IRiderService;

/**
 * B端骑手管理Service业务层处理
 * 
 * @author Hao
 * @date 2024-03-31
 */
@Service
public class RiderServiceImpl implements IRiderService 
{
    @Autowired
    private RiderMapper riderMapper;

    /**
     * 查询B端骑手管理
     * 
     * @param id B端骑手管理主键
     * @return B端骑手管理
     */
    @Override
    public Rider selectRiderById(String id)
    {
        return riderMapper.selectRiderById(id);
    }

    /**
     * 查询B端骑手管理列表
     * 
     * @param rider B端骑手管理
     * @return B端骑手管理
     */
    @Override
    public List<Rider> selectRiderList(Rider rider)
    {
        return riderMapper.selectRiderList(rider);
    }

    /**
     * 新增B端骑手管理
     * 
     * @param rider B端骑手管理
     * @return 结果
     */
    @Override
    public int insertRider(Rider rider)
    {
        return riderMapper.insertRider(rider);
    }

    /**
     * 修改B端骑手管理
     * 
     * @param rider B端骑手管理
     * @return 结果
     */
    @Override
    public int updateRider(Rider rider)
    {
        return riderMapper.updateRider(rider);
    }

    /**
     * 批量删除B端骑手管理
     * 
     * @param ids 需要删除的B端骑手管理主键
     * @return 结果
     */
    @Override
    public int deleteRiderByIds(String[] ids)
    {
        return riderMapper.deleteRiderByIds(ids);
    }

    /**
     * 删除B端骑手管理信息
     * 
     * @param id B端骑手管理主键
     * @return 结果
     */
    @Override
    public int deleteRiderById(String id)
    {
        return riderMapper.deleteRiderById(id);
    }
}
