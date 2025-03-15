<!--
 * @FilePath: index.vue
 * @Author: Aron
 * @Date: 2024-03-31 18:18:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-31 21:15:23
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
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户手机号" prop="userPhone">
        <el-input
          v-model="queryParams.userPhone"
          placeholder="请输入用户手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈时间">
        <el-date-picker
          v-model="daterangeFeedbackTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss""
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择处理状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.cuser_feedback_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理完成时间">
        <el-date-picker
          v-model="daterangeFinishTime"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss""
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="司机编号" prop="driverId">
        <el-input
          v-model="queryParams.driverId"
          placeholder="请输入司机编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户编号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="骑手编号" prop="riderId">
        <el-input
          v-model="queryParams.riderId"
          placeholder="请输入骑手编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人员" prop="handleStaff">
        <el-input
          v-model="queryParams.handleStaff"
          placeholder="请输入处理人员"
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['gh:feedback:add']"
          >新增</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['gh:feedback:edit']"
          >处理</el-button
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
          v-hasPermi="['gh:feedback:remove']"
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
          v-hasPermi="['gh:feedback:export']"
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
      :data="feedbackList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="订单编号" align="center" prop="orderId" />
      <el-table-column label="用户手机号" align="center" prop="userPhone" />
      <el-table-column label="反馈内容" align="center" prop="content" />
      <el-table-column
        label="反馈时间"
        align="center"
        prop="feedbackTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.feedbackTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.cuser_feedback_status"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column label="处理结果" align="center" prop="handleResult" />
      <el-table-column
        label="处理完成时间"
        align="center"
        prop="finishTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.finishTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="司机编号" align="center" prop="driverId" />
      <el-table-column label="用户编号" align="center" prop="userId" />
      <el-table-column label="骑手编号" align="center" prop="riderId" />
      <el-table-column label="处理人员" align="center" prop="handleStaff" />
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
            v-hasPermi="['gh:feedback:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['gh:feedback:remove']"
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

    <!-- 添加或修改反馈管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="用户手机号" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入用户手机号" />
        </el-form-item>
        <el-form-item label="反馈内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="反馈时间" prop="feedbackTime">
          <el-date-picker
            clearable
            v-model="form.feedbackTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss""
            placeholder="请选择反馈时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.cuser_feedback_status"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理结果" prop="handleResult">
          <el-input
            v-model="form.handleResult"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="处理完成时间" prop="finishTime">
          <el-date-picker
            clearable
            v-model="form.finishTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss""
            placeholder="请选择处理完成时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="司机编号" prop="driverId">
          <el-input v-model="form.driverId" placeholder="请输入司机编号" />
        </el-form-item>
        <el-form-item label="用户编号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户编号" />
        </el-form-item>
        <el-form-item label="骑手编号" prop="riderId">
          <el-input v-model="form.riderId" placeholder="请输入骑手编号" />
        </el-form-item>
        <el-form-item label="处理人员" prop="handleStaff">
          <el-input v-model="form.handleStaff" placeholder="请输入处理人员" />
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
  listFeedback,
  getFeedback,
  delFeedback,
  addFeedback,
  updateFeedback,
} from "@/api/gh/feedback";

export default {
  name: "Feedback",
  dicts: ["cuser_feedback_status"],
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
      // 反馈管理表格数据
      feedbackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 处理人员时间范围
      daterangeFeedbackTime: [],
      // 处理人员时间范围
      daterangeFinishTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        orderId: null,
        userPhone: null,
        content: null,
        feedbackTime: null,
        status: null,
        handleResult: null,
        finishTime: null,
        driverId: null,
        userId: null,
        riderId: null,
        handleStaff: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        userPhone: [
          { required: true, message: "用户手机号不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "反馈内容不能为空", trigger: "blur" },
        ],
        feedbackTime: [
          { required: true, message: "反馈时间不能为空", trigger: "blur" },
        ],
        status: [
          { required: true, message: "处理状态不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询反馈管理列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (
        null != this.daterangeFeedbackTime &&
        "" != this.daterangeFeedbackTime
      ) {
        this.queryParams.params["beginFeedbackTime"] =
          this.daterangeFeedbackTime[0];
        this.queryParams.params["endFeedbackTime"] =
          this.daterangeFeedbackTime[1];
      }
      if (null != this.daterangeFinishTime && "" != this.daterangeFinishTime) {
        this.queryParams.params["beginFinishTime"] =
          this.daterangeFinishTime[0];
        this.queryParams.params["endFinishTime"] = this.daterangeFinishTime[1];
      }
      listFeedback(this.queryParams).then((response) => {
        this.feedbackList = response.rows;
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
        orderId: null,
        userPhone: null,
        content: null,
        feedbackTime: null,
        status: null,
        handleResult: null,
        finishTime: null,
        driverId: null,
        userId: null,
        riderId: null,
        handleStaff: null,
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
      this.daterangeFeedbackTime = [];
      this.daterangeFinishTime = [];
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
      this.title = "添加反馈管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getFeedback(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "处理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateFeedback(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeedback(this.form).then((response) => {
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
        .confirm('是否确认删除反馈管理编号为"' + ids + '"的数据项？')
        .then(function () {
          return delFeedback(ids);
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
        "gh/feedback/export",
        {
          ...this.queryParams,
        },
        `feedback_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
