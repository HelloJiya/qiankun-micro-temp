<!--
  计划日历右侧表格
 -->
<template>
  <div class="dataPlan-table">
    <transition :duration="1000" @before-enter="enter" @leave="leave">
      <div v-show="visible" class="plan-date-table">
        <div class="plan-date-table-header">{{ dateFormat }}计划</div>
        <div class="plan-date-table-content">
          <div>
            <el-button
              v-if="canEdit"
              type="primary"
              size="mini"
              class="mb-15"
              :disabled="!selectionArr.length"
              @click="toggleDialog('CHANGE')"
            >计划时间调整</el-button>
          </div>
          <common-table
            class="table"
            :table-data="data"
            :table-cols="tableCols"
            :table-handles="tableHandles"
            :is-selection="canEdit"
            :is-page="false"
            :is-handle="canEdit"
            @handle-selection="(arr)=>selectionArr=arr"
          />
        </div>
      </div>
    </transition>

    <!-- 弹窗 -->
    <common-dialog v-if="dialogVisible" :loading="dialogLoading" :visible.sync="dialogVisible" :title="dialog.name" @submit="submit">
      <!-- 计划时间调整 -->
      <el-form ref="form" :rules="rules" :model="form" label-width="130px">
        <template v-if="dialog.key === 'CHANGE'">
          <el-form-item label="原计划执行日期">
            {{ dateFormat }}
          </el-form-item>
          <el-form-item label="现计划执行日期" prop="planDate">
            <el-date-picker
              v-model="form.planDate"
              :picker-options="pickerOptions"
              type="date"
              value-format="yyyy-MM-d"
            />
          </el-form-item>
        </template>
        <!-- 编辑 -->
        <template v-if="dialog.key === 'EDIT'">
          <el-form-item label="计划名称">{{ form.planName }}</el-form-item>
          <el-form-item label="计划类型">{{ getPlanDic(form.planType,'TYPE') }}</el-form-item>
          <el-form-item label="模板名称">{{ form.templateName }} </el-form-item>
          <el-form-item label="备注">{{ form.remark }} </el-form-item>
          <el-form-item label="执行人">{{ form.executorUserName }} </el-form-item>
          <el-form-item label="执行对象" prop="execElementIds">
            <PlanElementInput :id="form.planId" v-model="form.execElementIds" />
          </el-form-item>
          <el-form-item label="计划执行时间" prop="planDate">
            <el-date-picker
              v-model="form.planDate"
              :picker-options="pickerOptions"
              type="date"
              value-format="yyyy-MM-d"
            />
          </el-form-item>
        </template>
      </el-form>
    </common-dialog>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import { date as dateApi } from '@/api/plan'
import { PLAN } from '@/assets/CONST'
import { disabledDate } from '@/utils'

import { tableProp } from '../prop'

import PlanElementInput from '@/components/PlanElementInput'

// 弹窗内容配置
const DIALOG_TYPE = {
  EDIT: {
    name: '编辑',
    api: dateApi.edit

  },
  CHANGE: {
    name: '计划时间调整',
    api: dateApi.change,
    getQuery: 'getChangeQuery'
  }
}
export default {
  components: { PlanElementInput },
  props: {
    visible: Boolean,
    data: Array,
    date: Object
  },
  data() {
    const checkExecElementIds = (rule, value, callback) => { // 校验通知数量
      if (!this.form.execElementIds || !this.form.execElementIds.length) {
        callback(new Error('请选择执行对象'))
      } else {
        callback()
      }
    }
    return {
      ...tableProp(this),
      selectionArr: [],
      dateModel: '',
      dialogVisible: false,
      form: {},
      dialog: null,
      pickerOptions: { disabledDate },
      rules: {
        execElementIds: [
          { validator: checkExecElementIds, trigger: ['change', 'blur'] }
        ],
        planDate: [{ required: true, message: '请选择计划执行时间', trigger: ['change', 'blur'] }]
      },
      dialogLoading: false
    }
  },
  computed: {
    parent() {
      return this.$parent.$parent
    },
    // 当天及之前日期数据不可被操作
    canEdit() {
      const isTrue = Date.parse(this.date) > Date.parse(new Date())
      return isTrue
    },
    dateFormat() {
      return this.date.format('YYYY年MM月DD日')
    }
  },
  methods: {
    // 删除
    async delete(row) {
      const isTrue = await this.$_confirm('是否删除选中')
      if (isTrue) {
        dateApi.delete(row.id).then(res => {
          this.$message.success('删除成功')
          this.parent.getData()
        })
      }
    },
    // 弹窗展示
    toggleDialog(type, row = {}) {
      const TYPE = Object.keys(DIALOG_TYPE)
      if (TYPE.indexOf(type) === -1) { return false }

      this.dialog = DIALOG_TYPE[type]
      this.dialog.key = type

      this.form = this.$deepClone(row)

      if (type === 'EDIT') {
        if (this.form.execElementList && this.form.execElementList.length) {
          this.form.execElementIds = this.form.execElementList.map(item => item.id)
        }
      }
      this.dialogVisible = true
    },

    // 弹窗保存：计划时间调整、编辑
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { api, name, getQuery } = this.dialog
          let query = { ...this.form }
          if (getQuery) {
            query = this[getQuery]()
          }

          this.$_apiLoading(this, 'dialogLoading',
            () => api(this.$_formatApi(query)).then(res => {
              this.$message.success(`${name}成功`)
              this.dialogVisible = false
              this.parent.getData()
            }))
        }
      })
    },

    // 提交前数据处理：计划时间调整
    [DIALOG_TYPE.CHANGE.getQuery]() {
      const query = { ...this.form }
      query.ids = this.selectionArr.map(item => item.id)
      query.planTaskIds = this.selectionArr.map(item => item.planTaskId)

      return query
    },

    getPlanDic(value, CONST) {
      return this.$_findDic(value, PLAN[CONST])
    },

    // ==========动画
    enter(el, done) {
      Velocity(el, { width: 556 }, { complete: done })
    },
    leave(el, done) {
      Velocity(el, { width: 0 }, { complete: done })
    }

  }
}
</script>

<style lang="scss" scoped>
.mb-15{
  margin-bottom: 15px;
}
.plan-date-table{
  width: 556px;
  height: 100%;
 &-header{
   height: 52px;
   line-height: 52px;
   padding:0  12px;
   border-bottom: 1px solid #eee;
   font-size: 16px;
   box-sizing: border-box;
   overflow: hidden;

   white-space: nowrap;
 }
 /* 55px: header标题高度 */
 &-content{
   box-sizing: border-box;
   padding: 10px;
   height: calc(100% - 52px);
   overflow: hidden;

   display: flex;
   flex-direction: column;
   .table{
     flex: 1;
   }
 }
}
</style>
