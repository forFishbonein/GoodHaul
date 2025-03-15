package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.service.IIndexService;
import com.ruoyi.system.service.impl.util.IndexObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gh/index")
public class IndexController  extends BaseController {
    @Autowired
    private IIndexService indexService;

    @GetMapping("/visit")
    public AjaxResult visit() {
        return success(indexService.visitNumberIncrease());
    }

    @GetMapping("/allNumber")
    public AjaxResult number() {
        return success(indexService.getIndexNumber());
    }

    @GetMapping("/line")
    public AjaxResult line() {
        return success(indexService.getLineData());
    }

    @GetMapping("/raddar")
    public AjaxResult raddar() {
        return success(indexService.getRaddarData());
    }

    @GetMapping("/pie")
    public AjaxResult pie() {
        return success(indexService.getPieData());
    }

//    @GetMapping("/bar")
//    public AjaxResult bar() {
//        return success(indexService.getBarData());
//    }
}
