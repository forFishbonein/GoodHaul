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
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上次登陆时间">
        <el-date-picker
          v-model="daterangeLastLoginTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss""
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="上次订单完成时间">
        <el-date-picker
          v-model="daterangeLastFinishTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss""
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
          value-format="yyyy-MM-dd HH:mm:ss""
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="电车品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入电车品牌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电车颜色" prop="color">
        <el-input
          v-model="queryParams.color"
          placeholder="请输入电车颜色"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电车编入时间">
        <el-date-picker
          v-model="daterangeEnrollTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss""
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="完成订单总数" prop="finishOrderNumber">
        <el-input
          v-model="queryParams.finishOrderNumber"
          placeholder="请输入完成订单总数"
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
          v-hasPermi="['gh:rider:add']"
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
          v-hasPermi="['gh:rider:edit']"
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
          v-hasPermi="['gh:rider:remove']"
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
          v-hasPermi="['gh:rider:export']"
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
      :data="riderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="账号" align="center" prop="account" />
      <el-table-column label="密码" align="center" prop="password" />
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
        label="上次订单完成时间"
        align="center"
        prop="lastFinishTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastFinishTime, "{y}-{m}-{d}") }}</span>
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
      <el-table-column label="是否空闲" align="center" prop="isLeisure" />
      <el-table-column label="司机类型" align="center" prop="driverType" />
      <el-table-column label="电车品牌" align="center" prop="brand" />
      <el-table-column label="电车颜色" align="center" prop="color" />
      <el-table-column
        label="电车编入时间"
        align="center"
        prop="enrollTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.enrollTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column
        label="完成订单总数"
        align="center"
        prop="finishOrderNumber"
      />
      <el-table-column label="类型" align="center" prop="type" />
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
            v-hasPermi="['gh:rider:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['gh:rider:remove']"
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

    <!-- 添加或修改B端骑手管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号" prop="id">
          <el-input v-model="form.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="上次登陆时间" prop="lastLoginTime">
          <el-date-picker
            clearable
            v-model="form.lastLoginTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss""
            placeholder="请选择上次登陆时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上次订单完成时间" prop="lastFinishTime">
          <el-date-picker
            clearable
            v-model="form.lastFinishTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss""
            placeholder="请选择上次订单完成时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="账号创建时间" prop="accountCreateTime">
          <el-date-picker
            clearable
            v-model="form.accountCreateTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss""
            placeholder="请选择账号创建时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电车品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入电车品牌" />
        </el-form-item>
        <el-form-item label="电车颜色" prop="color">
          <el-input v-model="form.color" placeholder="请输入电车颜色" />
        </el-form-item>
        <el-form-item label="电车编入时间" prop="enrollTime">
          <el-date-picker
            clearable
            v-model="form.enrollTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss""
            placeholder="请选择电车编入时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="完成订单总数" prop="finishOrderNumber">
          <el-input
            v-model="form.finishOrderNumber"
            placeholder="请输入完成订单总数"
          />
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
  listRider,
  getRider,
  delRider,
  addRider,
  updateRider,
} from "@/api/gh/rider";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Rider",
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
      // B端骑手管理表格数据
      riderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 完成订单总数时间范围
      daterangeLastLoginTime: [],
      // 完成订单总数时间范围
      daterangeLastFinishTime: [],
      // 完成订单总数时间范围
      daterangeAccountCreateTime: [],
      // 完成订单总数时间范围
      daterangeEnrollTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        account: null,
        lastLoginTime: null,
        lastFinishTime: null,
        accountCreateTime: null,
        isLeisure: null,
        driverType: null,
        brand: null,
        color: null,
        enrollTime: null,
        name: null,
        phone: null,
        finishOrderNumber: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        accountCreateTime: [
          { required: true, message: "账号创建时间不能为空", trigger: "blur" },
        ],
        isLeisure: [
          { required: true, message: "是否空闲不能为空", trigger: "change" },
        ],
        driverType: [
          { required: true, message: "司机类型不能为空", trigger: "change" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "电话不能为空", trigger: "blur" }],
        finishOrderNumber: [
          { required: true, message: "完成订单总数不能为空", trigger: "blur" },
        ],
        type: [{ required: true, message: "类型不能为空", trigger: "change" }],
      },
      handleType: "add",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询B端骑手管理列表 */
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
        null != this.daterangeLastFinishTime &&
        "" != this.daterangeLastFinishTime
      ) {
        this.queryParams.params["beginLastFinishTime"] =
          this.daterangeLastFinishTime[0];
        this.queryParams.params["endLastFinishTime"] =
          this.daterangeLastFinishTime[1];
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
      if (null != this.daterangeEnrollTime && "" != this.daterangeEnrollTime) {
        this.queryParams.params["beginEnrollTime"] =
          this.daterangeEnrollTime[0];
        this.queryParams.params["endEnrollTime"] = this.daterangeEnrollTime[1];
      }
      listRider(this.queryParams).then((response) => {
        this.riderList = response.rows;
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
        account: null,
        password: null,
        lastLoginTime: null,
        lastFinishTime: null,
        accountCreateTime: null,
        isLeisure: null,
        driverType: null,
        brand: null,
        color: null,
        enrollTime: null,
        name: null,
        phone: null,
        finishOrderNumber: null,
        type: null,
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
      this.daterangeLastFinishTime = [];
      this.daterangeAccountCreateTime = [];
      this.daterangeEnrollTime = [];
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
      this.title = "添加B端骑手管理";
      this.form.id = uuidv4();
      this.handleType = "add";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getRider(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改B端骑手管理";
        this.handleType = "update";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.handleType == "update") {
            updateRider(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else if (this.handleType == "add") {
            addRider(this.form).then((response) => {
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
        .confirm('是否确认删除B端骑手管理编号为"' + ids + '"的数据项？')
        .then(function () {
          return delRider(ids);
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
        "gh/rider/export",
        {
          ...this.queryParams,
        },
        `rider_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
