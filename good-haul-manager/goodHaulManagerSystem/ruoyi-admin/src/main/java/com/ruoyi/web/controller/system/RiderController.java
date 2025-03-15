package com.ruoyi.web.controller.system;

import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.system.domain.Rider;
import com.ruoyi.system.service.IRiderService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * B端骑手管理Controller
 *
 * @author Hao
 * @date 2024-03-31
 */
@RestController
@RequestMapping("/gh/rider")
public class RiderController extends BaseController
{
    @Autowired
    private IRiderService riderService;

    /**
     * 查询B端骑手管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:rider:list')")
    @GetMapping("/list")
    public TableDataInfo list(Rider rider)
    {
        startPage();
        List<Rider> list = riderService.selectRiderList(rider);
        return getDataTable(list);
    }

    /**
     * 导出B端骑手管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:rider:export')")
    @Log(title = "B端骑手管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, Rider rider)
    {
        List<Rider> list = riderService.selectRiderList(rider);
        ExcelUtil<Rider> util = new ExcelUtil<Rider>(Rider.class);
        util.exportExcel(response, list, "B端骑手管理数据");
    }

    /**
     * 获取B端骑手管理详细信息
     */
    @PreAuthorize("@ss.hasPermi('gh:rider:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") String id)
    {
        return success(riderService.selectRiderById(id));
    }

    /**
     * 新增B端骑手管理
     */
    @PreAuthorize("@ss.hasPermi('gh:rider:add')")
    @Log(title = "B端骑手管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Rider rider)
    {
        return toAjax(riderService.insertRider(rider));
    }

    /**
     * 修改B端骑手管理
     */
    @PreAuthorize("@ss.hasPermi('gh:rider:edit')")
    @Log(title = "B端骑手管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Rider rider)
    {
        return toAjax(riderService.updateRider(rider));
    }

    /**
     * 删除B端骑手管理
     */
    @PreAuthorize("@ss.hasPermi('gh:rider:remove')")
    @Log(title = "B端骑手管理", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable String[] ids)
    {
        return toAjax(riderService.deleteRiderByIds(ids));
    }
}
