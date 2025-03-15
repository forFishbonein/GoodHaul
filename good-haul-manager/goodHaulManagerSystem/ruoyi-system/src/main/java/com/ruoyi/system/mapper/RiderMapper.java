package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.Rider;

/**
 * B端骑手管理Mapper接口
 * 
 * @author Hao
 * @date 2024-03-31
 */
public interface RiderMapper 
{
    /**
     * 查询B端骑手管理
     * 
     * @param id B端骑手管理主键
     * @return B端骑手管理
     */
    public Rider selectRiderById(String id);

    /**
     * 查询B端骑手管理列表
     * 
     * @param rider B端骑手管理
     * @return B端骑手管理集合
     */
    public List<Rider> selectRiderList(Rider rider);

    /**
     * 新增B端骑手管理
     * 
     * @param rider B端骑手管理
     * @return 结果
     */
    public int insertRider(Rider rider);

    /**
     * 修改B端骑手管理
     * 
     * @param rider B端骑手管理
     * @return 结果
     */
    public int updateRider(Rider rider);

    /**
     * 删除B端骑手管理
     * 
     * @param id B端骑手管理主键
     * @return 结果
     */
    public int deleteRiderById(String id);

    /**
     * 批量删除B端骑手管理
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteRiderByIds(String[] ids);
}
