<!--
 * @FilePath: index.vue
 * @Author: Aron
 * @Date: 2024-04-02 19:47:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-02 20:26:19
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
-->
<!--
 * @FilePath: index.vue
 * @Author: Aron
 * @Date: 2024-03-31 22:29:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-02 19:45:24
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
-->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="编号" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房间编号" prop="roomId">
        <el-input
          v-model="queryParams.roomId"
          placeholder="请输入房间编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上次聊天时间" prop="lastChatTime">
        <el-date-picker
          clearable
          v-model="queryParams.lastChatTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择上次聊天时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="聊天创建时间" prop="chatCreateTime">
        <el-date-picker
          clearable
          v-model="queryParams.chatCreateTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择聊天创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['gh:order:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="chatList">
      <el-table-column
        type="selection"
        width="55"
        align="center"
        fixed="left"
      />
      <el-table-column label="编号" align="center" prop="id" fixed="left" />
      <el-table-column
        label="房间编号"
        align="center"
        prop="roomId"
        fixed="left"
      />
      <el-table-column label="关联历史订单" width="180">
        <template slot-scope="scope">
          <el-tag
            type="info"
            v-for="(item, key) in scope.row.historyOrderId"
            :key="key"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="关联进行中订单" width="180">
        <template slot-scope="scope">
          <el-tag
            type="info"
            v-for="(item, key) in scope.row.doingOrderId"
            :key="key"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="用户信息" width="180">
        <template slot-scope="scope">
          <p>id：{{ scope.row.user.id }}</p>
          <p>phone：{{ scope.row.user.phone }}</p>
          <p>name：{{ scope.row.user.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="司机信息" width="180">
        <template slot-scope="scope">
          <p>id：{{ scope.row.driver.id }}</p>
          <p>phone：{{ scope.row.driver.phone }}</p>
          <p>name：{{ scope.row.driver.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="聊天内容" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="
              () => {
                chatInfo = scope.row.content;
                open = true;
              }
            "
            >点击查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="上次聊天时间"
        align="center"
        prop="lastChatTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ formDate(scope.row.lastChatTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="聊天创建时间"
        align="center"
        prop="chatCreateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ formDate(scope.row.chatCreateTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog
      title="聊天内容"
      :visible.sync="open"
      width="500px"
      append-to-body
      v-if="chatInfo"
    >
      <el-descriptions
        :title="'消息详情' + index"
        v-for="(item, index) in chatInfo"
        :key="index"
      >
        <el-descriptions-item label="编号">{{ item._id }}</el-descriptions-item>
        <el-descriptions-item label="内容">{{
          item.text
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          formDate(item.createdAt)
        }}</el-descriptions-item>
        <el-descriptions-item label="用户编号">{{
          item.user._id
        }}</el-descriptions-item>
        <el-descriptions-item label="用户头像">{{
          item.user.avatar
        }}</el-descriptions-item>
        <el-descriptions-item label="用户名字">{{
          item.user.name
        }}</el-descriptions-item>
      </el-descriptions>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            () => {
              open = false;
            }
          "
          >关 闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listChat } from "@/api/gh/chat";
import formDateOrigin from "../utils/formDate";
export default {
  name: "Chat",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 订单管理表格数据
      chatList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      chatInfo: {},
      // 查询参数
      queryParams: {
        id: null,
        roomId: null,
        plastChatTime: null,
        chatCreateTime: null,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formDate(date) {
      return formDateOrigin(date);
    },
    /** 查询订单管理列表 */
    getList() {
      this.loading = true;
      console.log(this.queryParams);
      listChat(this.queryParams).then((response) => {
        console.log(response);
        this.chatList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        roomId: null,
        historyOrderId: null,
        doingOrderId: null,
        user: null,
        driver: null,
        content: null,
        plastChatTime: null,
        chatCreateTime: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "gh/chat/export",
        {
          ...this.queryParams,
        },
        `chat_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
