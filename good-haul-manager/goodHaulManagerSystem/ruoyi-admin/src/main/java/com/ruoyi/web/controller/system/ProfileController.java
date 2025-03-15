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
import com.ruoyi.system.domain.Profile;
import com.ruoyi.system.service.IProfileService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * C端用户信息管理Controller
 *
 * @author Hao
 * @date 2024-03-31
 */
@RestController
@RequestMapping("/gh/profile")
public class ProfileController extends BaseController
{
    @Autowired
    private IProfileService profileService;

    /**
     * 查询C端用户信息管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:profile:list')")
    @GetMapping("/list")
    public TableDataInfo list(Profile profile)
    {
        startPage();
        List<Profile> list = profileService.selectProfileList(profile);
        return getDataTable(list);
    }

    /**
     * 导出C端用户信息管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:profile:export')")
    @Log(title = "C端用户信息管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, Profile profile)
    {
        List<Profile> list = profileService.selectProfileList(profile);
        ExcelUtil<Profile> util = new ExcelUtil<Profile>(Profile.class);
        util.exportExcel(response, list, "C端用户信息管理数据");
    }

    /**
     * 获取C端用户信息管理详细信息
     */
    @PreAuthorize("@ss.hasPermi('gh:profile:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return success(profileService.selectProfileById(id));
    }

    /**
     * 新增C端用户信息管理
     */
    @PreAuthorize("@ss.hasPermi('gh:profile:add')")
    @Log(title = "C端用户信息管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Profile profile)
    {
        return toAjax(profileService.insertProfile(profile));
    }

    /**
     * 修改C端用户信息管理
     */
    @PreAuthorize("@ss.hasPermi('gh:profile:edit')")
    @Log(title = "C端用户信息管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Profile profile)
    {
        return toAjax(profileService.updateProfile(profile));
    }

    /**
     * 删除C端用户信息管理
     */
    @PreAuthorize("@ss.hasPermi('gh:profile:remove')")
    @Log(title = "C端用户信息管理", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        return toAjax(profileService.deleteProfileByIds(ids));
    }
}
