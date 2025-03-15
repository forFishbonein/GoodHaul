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
import com.ruoyi.system.domain.CEndUser;
import com.ruoyi.system.service.ICEndUserService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * C端用户管理Controller
 *
 * @author ruoyi
 * @date 2024-03-31
 */
@RestController
@RequestMapping("/gh/cenduser")
public class CEndUserController extends BaseController
{
    @Autowired
    private ICEndUserService cEndUserService;

    /**
     * 查询C端用户管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:cenduser:list')")
    @GetMapping("/list")
    public TableDataInfo list(CEndUser cEndUser)
    {
        startPage();
        List<CEndUser> list = cEndUserService.selectCEndUserList(cEndUser);
        return getDataTable(list);
    }

    /**
     * 导出C端用户管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:cenduser:export')")
    @Log(title = "C端用户管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, CEndUser cEndUser)
    {
        List<CEndUser> list = cEndUserService.selectCEndUserList(cEndUser);
        ExcelUtil<CEndUser> util = new ExcelUtil<CEndUser>(CEndUser.class);
        util.exportExcel(response, list, "C端用户管理数据");
    }

    /**
     * 获取C端用户管理详细信息
     */
    @PreAuthorize("@ss.hasPermi('gh:cenduser:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") String id)
    {
        return success(cEndUserService.selectCEndUserById(id));
    }

    /**
     * 新增C端用户管理
     */
    @PreAuthorize("@ss.hasPermi('gh:cenduser:add')")
    @Log(title = "C端用户管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody CEndUser cEndUser)
    {
        return toAjax(cEndUserService.insertCEndUser(cEndUser));
    }

    /**
     * 修改C端用户管理
     */
    @PreAuthorize("@ss.hasPermi('gh:cenduser:edit')")
    @Log(title = "C端用户管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody CEndUser cEndUser)
    {
        return toAjax(cEndUserService.updateCEndUser(cEndUser));
    }

    /**
     * 删除C端用户管理
     */
    @PreAuthorize("@ss.hasPermi('gh:cenduser:remove')")
    @Log(title = "C端用户管理", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable String[] ids)
    {
        return toAjax(cEndUserService.deleteCEndUserByIds(ids));
    }
}
