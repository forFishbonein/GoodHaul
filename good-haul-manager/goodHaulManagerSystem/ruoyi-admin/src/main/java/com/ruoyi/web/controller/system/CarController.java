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
import com.ruoyi.system.domain.Car;
import com.ruoyi.system.service.ICarService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * 司机车辆管理Controller
 *
 * @author Hao
 * @date 2024-03-31
 */
@RestController
@RequestMapping("/gh/car")
public class CarController extends BaseController
{
    @Autowired
    private ICarService carService;

    /**
     * 查询司机车辆管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:car:list')")
    @GetMapping("/list")
    public TableDataInfo list(Car car)
    {
        startPage();
        List<Car> list = carService.selectCarList(car);
        return getDataTable(list);
    }

    /**
     * 导出司机车辆管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:car:export')")
    @Log(title = "司机车辆管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, Car car)
    {
        List<Car> list = carService.selectCarList(car);
        ExcelUtil<Car> util = new ExcelUtil<Car>(Car.class);
        util.exportExcel(response, list, "司机车辆管理数据");
    }

    /**
     * 获取司机车辆管理详细信息
     */
    @PreAuthorize("@ss.hasPermi('gh:car:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return success(carService.selectCarById(id));
    }

    /**
     * 新增司机车辆管理
     */
    @PreAuthorize("@ss.hasPermi('gh:car:add')")
    @Log(title = "司机车辆管理", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody Car car)
    {
        return toAjax(carService.insertCar(car));
    }

    /**
     * 修改司机车辆管理
     */
    @PreAuthorize("@ss.hasPermi('gh:car:edit')")
    @Log(title = "司机车辆管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody Car car)
    {
        return toAjax(carService.updateCar(car));
    }

    /**
     * 删除司机车辆管理
     */
    @PreAuthorize("@ss.hasPermi('gh:car:remove')")
    @Log(title = "司机车辆管理", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        return toAjax(carService.deleteCarByIds(ids));
    }
}
