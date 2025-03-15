<!--
 * @FilePath: index.vue
 * @Author: Aron
 * @Date: 2024-03-31 22:29:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-02 19:53:31
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
      <el-form-item label="用户编号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="司机编号" prop="driverId">
        <el-input
          v-model="queryParams.driverId"
          placeholder="请输入司机编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货车类型" prop="carType">
        <el-select v-model="queryParams.carType" placeholder="请选择货车类型">
          <el-option
            v-for="item in optionsCar"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货运距离" prop="distance">
        <el-input
          v-model="queryParams.distance"
          placeholder="请输入货运距离"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="跟车人数" prop="peopleNumber">
        <el-input
          v-model="queryParams.peopleNumber"
          placeholder="请输入跟车人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单价格" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入订单价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="额外价格" prop="extraPrice">
        <el-input
          v-model="queryParams.extraPrice"
          placeholder="请输入额外价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择订单状态">
          <el-option
            v-for="item in optionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务时间" prop="time">
        <el-date-picker
          clearable
          v-model="queryParams.time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择服务时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收货码" prop="confirmCode">
        <el-input
          v-model="queryParams.confirmCode"
          placeholder="请输入收货码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单创建时间" prop="createTime">
        <el-date-picker
          clearable
          v-model="queryParams.createTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择订单创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单更新时间" prop="updateTime">
        <el-date-picker
          clearable
          v-model="queryParams.updateTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择订单更新时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单完成时间" prop="finishTime">
        <el-date-picker
          clearable
          v-model="queryParams.finishTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择订单完成时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付完成时间" prop="completePayTime">
        <el-date-picker
          clearable
          v-model="queryParams.completePayTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择支付完成时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否需要退款" prop="needReFund">
        <el-select
          v-model="queryParams.needReFund"
          placeholder="请选择是否需要退款"
        >
          <el-option label="需要" value="1"> </el-option>
          <el-option label="不需要" value="0"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单服务类型" prop="serviceType">
        <el-select
          v-model="queryParams.serviceType"
          placeholder="请选择订单服务类型"
        >
          <el-option label="搬家" value="move"> </el-option>
          <el-option label="跑腿" value="run"> </el-option>
        </el-select>
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
          v-hasPermi="['gh:order:add']"
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
          v-hasPermi="['gh:order:edit']"
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
          v-hasPermi="['gh:order:remove']"
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
          v-hasPermi="['gh:order:export']"
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
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        fixed="left"
      />
      <el-table-column label="编号" align="center" prop="id" fixed="left" />
      <el-table-column
        label="用户编号"
        align="center"
        prop="userId"
        fixed="left"
      />

      <el-table-column label="货车类型">
        <template slot-scope="scope">
          <span>{{ carNameTable[scope.row.carType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="
              () => {
                addressInfo = scope.row.address;
                open2 = true;
              }
            "
            >点击查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="距离" align="center" prop="distance" />
      <el-table-column label="跟车人数" align="center" prop="peopleNumber" />
      <el-table-column label="订单费用" align="center" prop="price" />
      <el-table-column label="额外费用" align="center" prop="extraPrice" />
      <el-table-column label="已支付费用" align="center" prop="paidPrice" />
      <el-table-column label="服务类型">
        <template slot-scope="scope">
          <span>{{
            scope.row.serviceType == "move"
              ? "搬家"
              : scope.row.serviceType == "run"
              ? "跑腿"
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="服务时间" align="center" prop="serviceType" />
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span>{{ orderStatusTable[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="确认码" align="center" prop="confirmCode" />
      <el-table-column label="司机编号" align="center" prop="driverId" />
      <el-table-column label="聊天编号" align="center" prop="chatId" />
      <el-table-column label="货车编号" align="center" prop="carId" />
      <el-table-column
        label="订单创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ formDate(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ formDate(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单完成时间"
        align="center"
        prop="finishTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ formDate(scope.row.finishTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单尾款支付时间"
        align="center"
        prop="completePayTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ formDate(scope.row.completePayTime) }}</span>
        </template>
      </el-table-column>
      <!--  v-if="scope.row.status == 'canceled'" -->
      <el-table-column label="是否需要退订金">
        <template slot-scope="scope">
          <span>{{
            scope.row.needReFund == "1"
              ? "需要"
              : scope.row.serviceType == "0"
              ? "不需要"
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
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
            v-hasPermi="['gh:order:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['gh:order:remove']"
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

    <!-- 添加或修改订单管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户编号" prop="userId">
          <el-input
            v-model="form.userId"
            placeholder="请输入用户编号"
            clearable
          />
        </el-form-item>
        <el-form-item label="货车类型" prop="carType">
          <el-select v-model="form.carType" placeholder="请选择货车类型">
            <el-option
              v-for="item in optionsCar"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货运距离" prop="distance">
          <el-input
            v-model="form.distance"
            placeholder="请输入货运距离"
            clearable
          />
        </el-form-item>
        <el-form-item label="跟车人数" prop="peopleNumber">
          <el-input
            v-model="form.peopleNumber"
            placeholder="请输入跟车人数"
            clearable
          />
        </el-form-item>
        <el-form-item label="订单价格" prop="price">
          <el-input
            v-model="form.price"
            placeholder="请输入订单价格"
            clearable
          />
        </el-form-item>
        <el-form-item label="额外价格" prop="extraPrice">
          <el-input
            v-model="form.extraPrice"
            placeholder="请输入额外价格"
            clearable
          />
        </el-form-item>
        <el-form-item label="订单服务类型" prop="serviceType">
          <el-select
            v-model="form.serviceType"
            placeholder="请选择订单服务类型"
          >
            <el-option label="搬家" value="move"> </el-option>
            <el-option label="跑腿" value="run"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" clearable />
        </el-form-item>
        <el-form-item label="服务时间" prop="time">
          <el-date-picker
            clearable
            v-model="form.time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择服务时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择订单状态">
            <el-option
              v-for="item in optionsStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货码" prop="confirmCode">
          <el-input
            v-model="form.confirmCode"
            placeholder="请输入收货码"
            clearable
          />
        </el-form-item>
        <el-form-item label="司机编号" prop="driverId">
          <el-input
            v-model="form.driverId"
            placeholder="请输入司机编号"
            clearable
          />
        </el-form-item>
        <el-form-item label="聊天编号" prop="chatId">
          <el-input
            v-model="form.chatId"
            placeholder="请输入聊天编号"
            clearable
          />
        </el-form-item>
        <el-form-item label="货车编号" prop="carId">
          <el-input
            v-model="form.carId"
            placeholder="请输入货车编号"
            clearable
          />
        </el-form-item>
        <el-form-item label="订单创建时间" prop="createTime">
          <el-date-picker
            clearable
            v-model="form.createTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择订单创建时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单更新时间" prop="updateTime">
          <el-date-picker
            clearable
            v-model="form.updateTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择订单更新时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单完成时间" prop="finishTime">
          <el-date-picker
            clearable
            v-model="form.finishTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择订单完成时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付完成时间" prop="completePayTime">
          <el-date-picker
            clearable
            v-model="form.completePayTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择支付完成时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="地址详细信息"
      :visible.sync="open2"
      width="500px"
      append-to-body
      v-if="addressInfo.out && addressInfo.in"
    >
      <el-descriptions title="搬出信息">
        <el-descriptions-item label="搬出地址">{{
          addressInfo.out.poiaddress
        }}</el-descriptions-item>
        <el-descriptions-item label="地址名">{{
          addressInfo.out.poiname
        }}</el-descriptions-item>
        <el-descriptions-item label="搬出电话">{{
          addressInfo.out.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="搬出楼层">{{
          addressInfo.out.floor
        }}</el-descriptions-item>
        <el-descriptions-item label="搬出门牌号">{{
          addressInfo.out.door
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="搬入信息">
        <el-descriptions-item label="搬入地址">{{
          addressInfo.in.poiaddress
        }}</el-descriptions-item>
        <el-descriptions-item label="地址名">{{
          addressInfo.in.poiname
        }}</el-descriptions-item>
        <el-descriptions-item label="搬入电话">{{
          addressInfo.in.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="搬入楼层">{{
          addressInfo.in.floor
        }}</el-descriptions-item>
        <el-descriptions-item label="搬入门牌号">{{
          addressInfo.in.door
        }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            () => {
              open2 = false;
            }
          "
          >关 闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
} from "@/api/gh/order";
import { v4 as uuidv4 } from "uuid";
import formDateOrigin from "../utils/formDate";
export default {
  name: "Order",
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
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open2: false,
      addressInfo: {},
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        id: null,
        userId: null,
        chatId: null,
        address: null,
        carType: null,
        distance: null,
        peopleNumber: null,
        price: null,
        remark: null,
        time: null,
        status: null,
        driverId: null,
        carId: null,
        confirmCode: null,
        createTime: null,
        updateTime: null,
        extraPrice: null,
        serviceType: null,
        paidPrice: null,
        finishTime: null,
        completePayTime: null,
        needRefund: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "change" }],
      },
      handleType: "add",
      optionsCar: [
        { label: "小面", value: "Small" },
        { label: "中面", value: "Middle" },
        { label: "小货", value: "STruck" },
        { label: "中货", value: "MTruck" },
        { label: "5米2", value: "FiveTwo" },
        { label: "6米8", value: "SixEight" },
      ],
      optionsStatus: [
        { label: "待支付订金", value: "wait-paydeposit" },
        { label: "等待接单", value: "wait-receive" },
        { label: "司机正在赶来", value: "on-way" },
        { label: "正在装载运输", value: "load-transport" },
        { label: "待支付尾款", value: "wait-payremain" },
        { label: "订单已结束", value: "finished" },
        { label: "订单已取消", value: "canceled" },
      ],
      carNameTable: {
        Small: "小面",
        Middle: "中面",
        STruck: "小货",
        MTruck: "中货",
        FiveTwo: "5米2",
        SixEight: "6米8",
      },
      orderStatusTable: {
        "wait-paydeposit": "待支付订金",
        "wait-receive": "等待接单",
        "on-way": "司机正在赶来",
        "load-transport": "正在装载运输",
        "wait-payremain": "待支付尾款",
        finished: "订单已结束",
        canceled: "订单已取消",
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
      // let params = JSON.parse(JSON.stringify(this.queryParams));
      // for (let key in params) {
      //   if (params[key] === null) {
      //     delete params[key];
      //   }
      // }
      listOrder(this.queryParams).then((response) => {
        console.log(response);
        this.orderList = response.rows;
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
        userId: null,
        chatId: null,
        address: null,
        carType: null,
        distance: null,
        peopleNumber: null,
        price: null,
        remark: null,
        time: null,
        status: null,
        driverId: null,
        carId: null,
        confirmCode: null,
        createTime: null,
        updateTime: null,
        extraPrice: null,
        serviceType: null,
        paidPrice: null,
        finishTime: null,
        completePayTime: null,
        needRefund: null,
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
      this.title = "添加订单管理";
      this.handleType = "add";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getOrder(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单管理";
        this.handleType = "update";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.handleType == "update") {
            updateOrder(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else if (this.handleType == "add") {
            addOrder(this.form).then((response) => {
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
        .confirm('是否确认删除订单管理编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrder(ids);
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
        "gh/order/export",
        {
          ...this.queryParams,
        },
        `order_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
