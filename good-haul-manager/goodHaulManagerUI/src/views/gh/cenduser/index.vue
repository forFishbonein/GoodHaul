<!--
 * @FilePath: index.vue
 * @Author: Aron
 * @Date: 2024-03-31 16:05:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-02 14:37:49
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
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上次登陆时间">
        <el-date-picker
          v-model="daterangeLastLoginTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="上次改密时间">
        <el-date-picker
          v-model="daterangePasswordUpdateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="账号创建时间">
        <el-date-picker
          v-model="daterangeAccountCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="个人信息id" prop="profileId">
        <el-input
          v-model="queryParams.profileId"
          placeholder="请输入个人信息id"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['gh:cenduser:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['gh:cenduser:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['gh:cenduser:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['gh:cenduser:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="cenduserList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column
        label="上次登陆时间"
        align="center"
        prop="lastLoginTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastLoginTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上次改密时间"
        align="center"
        prop="passwordUpdateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.passwordUpdateTime, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号创建时间"
        align="center"
        prop="accountCreateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.accountCreateTime, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="个人信息id" align="center" prop="profileId" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['gh:cenduser:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['gh:cenduser:remove']"
            >删除</el-button
          >
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

    <!-- 添加或修改C端用户管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号" prop="id">
          <el-input v-model="form.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="上次登陆时间" prop="lastLoginTime">
          <el-date-picker
            clearable
            v-model="form.lastLoginTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择上次登陆时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上次改密时间" prop="passwordUpdateTime">
          <el-date-picker
            clearable
            v-model="form.passwordUpdateTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择上次改密时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="账号创建时间" prop="accountCreateTime">
          <el-date-picker
            clearable
            v-model="form.accountCreateTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择账号创建时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="个人信息id" prop="profileId">
          <el-input v-model="form.profileId" placeholder="请输入个人信息id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listCenduser,
  getCenduser,
  delCenduser,
  addCenduser,
  updateCenduser,
} from "@/api/gh/cenduser";
import { listOrder } from "@/api/gh/order";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Cenduser",
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
      // C端用户管理表格数据
      cenduserList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 个人信息id时间范围
      daterangeLastLoginTime: [],
      // 个人信息id时间范围
      daterangePasswordUpdateTime: [],
      // 个人信息id时间范围
      daterangeAccountCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        phone: null,
        lastLoginTime: null,
        passwordUpdateTime: null,
        accountCreateTime: null,
        profileId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "change" }],
      },
      handleType: "add",
    };
  },
  created() {
    this.getList();
    // listOrder().then((response) => {
    //   console.log(response);
    // });
  },
  methods: {
    /** 查询C端用户管理列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (
        null != this.daterangeLastLoginTime &&
        "" != this.daterangeLastLoginTime
      ) {
        this.queryParams.params["beginLastLoginTime"] =
          this.daterangeLastLoginTime[0];
        this.queryParams.params["endLastLoginTime"] =
          this.daterangeLastLoginTime[1];
      }
      if (
        null != this.daterangePasswordUpdateTime &&
        "" != this.daterangePasswordUpdateTime
      ) {
        this.queryParams.params["beginPasswordUpdateTime"] =
          this.daterangePasswordUpdateTime[0];
        this.queryParams.params["endPasswordUpdateTime"] =
          this.daterangePasswordUpdateTime[1];
      }
      if (
        null != this.daterangeAccountCreateTime &&
        "" != this.daterangeAccountCreateTime
      ) {
        this.queryParams.params["beginAccountCreateTime"] =
          this.daterangeAccountCreateTime[0];
        this.queryParams.params["endAccountCreateTime"] =
          this.daterangeAccountCreateTime[1];
      }
      listCenduser(this.queryParams).then((response) => {
        this.cenduserList = response.rows;
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
        phone: null,
        password: null,
        lastLoginTime: null,
        passwordUpdateTime: null,
        accountCreateTime: null,
        type: null,
        profileId: null,
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
      this.daterangeLastLoginTime = [];
      this.daterangePasswordUpdateTime = [];
      this.daterangeAccountCreateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加C端用户管理";
      this.form.id = uuidv4();
      this.handleType = "add";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCenduser(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改C端用户管理";
        this.handleType = "update";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.handleType == "update") {
            updateCenduser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else if (this.handleType == "add") {
            addCenduser(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除C端用户管理编号为"' + ids + '"的数据项？')
        .then(function () {
          return delCenduser(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "gh/cenduser/export",
        {
          ...this.queryParams,
        },
        `cenduser_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
