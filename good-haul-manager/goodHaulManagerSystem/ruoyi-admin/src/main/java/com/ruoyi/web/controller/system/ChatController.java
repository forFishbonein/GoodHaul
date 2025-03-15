package com.ruoyi.web.controller.system;

import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.system.domain.Chat;
import com.ruoyi.system.domain.Order;
import com.ruoyi.system.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 订单管理Controller
 *
 * @author Hao
 * @date 2024-03-31
 */
@RestController
@RequestMapping("/gh/chat")
public class ChatController extends BaseController
{
    @Autowired
    private IChatService chatService;

    /**
     * 查询聊天管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:chat:list')")
    @GetMapping("/list")
    public TableDataInfo list(Chat chat)
    {
        List<Chat> list = chatService.getAllChats(chat);
        return getDataTable(list);
    }

    /**
     * 导出聊天管理列表
     */
    @PreAuthorize("@ss.hasPermi('gh:chat:export')")
    @Log(title = "聊天管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, Chat chat)
    {
        List<Chat> list = chatService.getAllChats(chat);
        ExcelUtil<Chat> util = new ExcelUtil<>(Chat.class);
        util.exportExcel(response, list, "订单管理数据");
    }
}

