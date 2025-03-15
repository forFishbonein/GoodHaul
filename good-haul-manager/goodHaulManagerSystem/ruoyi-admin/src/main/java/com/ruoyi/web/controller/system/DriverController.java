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
import com.ruoyi.system.domain.Driver;
import com.ruoyi.system.service.IDriverService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * B端司机管理Controller
 *
 * @author Hao
 * @date 2024-03-31
 */
@RestController
@RequestMapping("/gh/driver")
public class DriverController extends BaseController
{
    @Autowired
    private IDriverService driverService;

    /**
     * 查询B端司机管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:driver:list')")
    @GetMapping("/list")
    public TableDataInfo list(Driver driver)
    {
        startPage();
        List<Driver> list = driverService.selectDriverList(driver);
        return getDataTable(list);
    }

    /**
     * 导出B端司机管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:driver:export')")
    @Log(title = "B端司机管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, Driver driver)
    {
        List<Driver> list = driverService.selectDriverList(driver);
        ExcelUtil<Driver> util = new ExcelUtil<Driver>(Driver.class);
        util.exportExcel(response, list, "B端司机管理数据");
    }

    /**
     * 获取B端司机管理详细信息
     */
    @PreAuthorize("@ss.hasPermi('gh:driver:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") String id)
    {
        return success(driverService.selectDriverById(id));
    }

    /**
     * 新增B端司机管理
     */
    @PreAuthorize("@ss.hasPermi('gh:driver:add')")
    @Log(title = "B端司机管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Driver driver)
    {
        return toAjax(driverService.insertDriver(driver));
    }

    /**
     * 修改B端司机管理
     */
    @PreAuthorize("@ss.hasPermi('gh:driver:edit')")
    @Log(title = "B端司机管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Driver driver)
    {
        return toAjax(driverService.updateDriver(driver));
    }

    /**
     * 删除B端司机管理
     */
    @PreAuthorize("@ss.hasPermi('gh:driver:remove')")
    @Log(title = "B端司机管理", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable String[] ids)
    {
        return toAjax(driverService.deleteDriverByIds(ids));
    }
}
