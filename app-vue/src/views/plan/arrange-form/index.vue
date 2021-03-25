<template>
  <edit-page :title="$route.meta.title" class="planning-form" :loading="loading">
    <!-- baseForm -->
    <el-form ref="baseForm" :rules="baseRules" :model="plan" inline>
      <el-form-item label="计划名称" prop="planName">
        <el-input v-model="plan.planName" :disabled="isShow" />
      </el-form-item>
      <el-form-item label="计划类型" prop="planType">
        <el-select v-model="plan.planType" placeholder="" :disabled="noEdit" @change="changeType">
          <el-option
            v-for="item in PLAN.TYPE"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateId">
        <el-select v-model="plan.templateId" placeholder="" :disabled="noEdit" @change="changeTemp">
          <el-option
            v-for="item in tempList"
            :key="item.id"
            :label="item.templateName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="plan.remark" type="textarea" placeholder="" :disabled="isShow" />
      </el-form-item>
    </el-form>

    <!-- template Form -->
    <el-form

      ref="tempForm"
      :model="tempForm"
      inline
    >
      <el-form-item
        v-for="item in elementList"
        :key="item.id"
        :label="item.name"
        :prop="item.id"
        :rules="{required:item.fillType === 0,message:`请输入${item.name}`,trigger:['blur','change']}"
      >
        <component
          :is="item.elementType === 1? 'el-input':'el-select'"
          v-model="item.content"
          :disabled="item.fillType === 1 || noEdit"
          :placeholder="item.fillType === 1?'维保时填写':`请输入${item.name}`"
        >
          <template v-if="item.elementType === 0">
            <el-option
              v-for="sItem in (item.options && item.options.split(/[, ，\s+]/)) || []"
              :key="sItem"
              :label="sItem"
              :value="sItem"
            />
          </template>
        </component>
      </el-form-item>
    </el-form>

    <!-- table -->
    <section class="table">
      <el-table :data="rowData" style="width: 80%" border size="mini">
        <el-table-column prop="name" :label="table.title" />
        <el-table-column
          v-for="item in headList"
          :key="item.id"
          :label="item.name"
        />
      </el-table>
    </section>

    <!-- 底部提交按钮 -->
    <el-button v-if="!isShow" slot="footer" type="primary" size="large" @click="submit">确定</el-button>
  </edit-page>
</template>

<script>
import props from './props'
import { PLAN } from '@/assets/CONST'
import { plan, temp } from '@/api/plan'
import { delView } from '@/utils/micro'

export default {
  name: 'PlanArrangeForm',
  data() {
    return {
      ...props(this),
      ID: '',
      loading: false,
      PLAN,
      // 计划确认
      plan: {},
      // tempForm: {},
      elementList: [],
      tempInfo: {}, // 模板信息
      tempList: [], // 模板列表,
      headList: [],
      table: {},
      // 基础表单校验规则
      baseRules: {
        planName: { required: true, message: '请输入计划名称', trigger: ['blur', 'change'] },
        planType: { required: true, message: '请选择计划类型', trigger: ['blur', 'change'] },
        templateId: { required: true, message: '请选择模板', trigger: ['blur', 'change'] }
      }
    }
  },
  computed: {
    noEdit() {
      return this.isShow || this.$route.name === 'PlanArrangeFormEdit'
    },
    // 详情
    isShow() {
      return this.$route.name === 'PlanArrangeFormShow'
    },
    rowData() {
      const { rowList } = this.$deepClone(this.table)
      const list = rowList ? rowList.splice(',').map(item => ({ name: item })) : []
      return list
    },
    tempForm: {
      get() {
        const ret = {}
        if (this.elementList) {
          this.elementList.forEach(item => {
            ret[item.id] = item.content
          })
        }
        return ret
      }
    }
  },
  watch: {
    'plan.planType': {
      handler(nV, oV) {
        if (nV !== undefined) {
          this.getTempList(nV)
        }
      }
      // immediate: true
    },
    '$route.query.id': {
      handler(nV, oV) {
        if (nV) {
          this.getData(nV)
        }
      }
    }
  },
  created() {
    const { id } = this.$route.query
    if (id) {
      this.ID = id
      this.getData(id)
    }
  },
  methods: {
    getData(id) {
      this.getPlanInfo(id)
    },
    changeType(val) {
      if (this.plan.templateId) { this.plan.templateId = '' }
    },
    // 模板名称 下拉框 change事件
    changeTemp(val) {
      if (val) {
        this.getTempInfo(val)
      } else {
        this.tempInfo = {}
      }
    },

    // ==========
    // ========== 模板
    // 获取模板列表
    getTempList(val) {
      this.tempList = {}
      temp.getList({ data: { planType: val }}).then(res => {
        const { records } = this.$deepClone(res.data)
        this.tempList = records
      })
    },
    // 获取模板信息
    getTempInfo(id) {
      this.loading = true
      temp.getInfo(id).then(res => {
        const data = this.$deepClone(res.data)
        this.tempInfo = data
        const { elementList, headList, table } = this.$deepClone(res.data)
        Object.assign(this, { elementList, headList, table })
      }).finally(_ => {
        this.loading = false
      })
    },
    // 获取计划信息
    getPlanInfo(id) {
      this.loading = true
      plan.getInfo(id).then(res => {
        const { plan, elementList, headList, table } = this.$deepClone(res.data)
        Object.assign(this, { plan, elementList, headList, table })
      }).finally(_ => {
        this.loading = false
      })
    },
    // 保存
    async submit() {
      const isTrue = await this.validForm()
      if (!isTrue) {
        return false
      }
      const { plan: form, elementList, headList, table } = this
      const data = { plan: form, elementList, headList, table }
      this.$_apiLoading(this, 'loading',
        () => plan.save(this.$_formatApi(data)).then(res => {
          this.$message.success(this.$route.meta.title + '成功')
          // 关闭tag
          delView(this.$route)
          this.$router.replace({ name: 'PlaneArrange' })
        })
      )
    },
    // 保存前校验
    async validForm() {
      const isTrue = await this.$refs.baseForm.validate()
      if (!isTrue) {
        return false
      }
      const isTempTrue = await this.$refs.tempForm.validate()
      if (!isTempTrue) {
        return false
      }
      return true
    }

  }
}
</script>

<style lang="scss" scoped>
.pd20{
  padding-bottom: 20px;
}
.noPadding{
  padding: 0 !important;
}
.planning-form{
  /deep/.el-form-item{
    width: 30%;
    text-align: right;
  }
  /deep/.el-input, .el-select, .el-textarea{
    width: 240px;
  }
}
</style>
