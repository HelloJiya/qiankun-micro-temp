<template>
  <edit-page :loading="loading" :title="$route.meta.title">
    <!-- 模板表单 -->
    <section class="ftf-base">
      <el-form ref="ruleForm" inline size="mini" :rules="rules" :model="template" class="ftf-base-form">
        <el-form-item label="模板名称" prop="templateName" class="ftf-base-form-item">
          <el-input v-model="template.templateName" maxlength="32" placeholder="" />
        </el-form-item>
        <el-form-item label="计划类型" prop="planType" class="ftf-base-form-item">
          <el-select v-model="template.planType" placeholder="">
            <el-option
              v-for="item in PLAN.TYPE"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模板备注" class="ftf-base-form-item">
          <el-input v-model="template.remark" maxlength="255" />
        </el-form-item>
      </el-form>
    </section>

    <!--  配置: ./prop.js -->
    <!-- 表格表单 -->
    <card class="ftf-content">
      <EditTable :table-col="eleColConfig" :data.sync="elementList" :add-default="eleInit" :height="height">
        <!-- 表头「维保时填写」重写 -->
        <template slot="nameTitle">
          <span>维保时填写</span>
          <el-popover
            placement="top"
            title="说明"
            trigger="hover"
            content="维保时填写，即维修人员在现场操作时填写内容"
          >
            <el-button slot="reference" type="text" style="padding:0" icon="el-icon-question" />
          </el-popover>
        </template>
      </EditTable>
    </card>

    <!-- 表格  -->
    <card class="ftf-content">
      <div class="ftf-content-item">
        <el-form ref="tableForm" :model="table" :rules="tableRules" label-width="80px" inline>
          <el-form-item label="" prop="name">
            <el-input v-model="table.name" style="width:200px" maxlength="32" placeholder="请输入数据项标题" />
          </el-form-item>
          <el-form-item label="" prop="title">
            <el-input v-model="table.title" style="width:200px" maxlength="32" placeholder="标题" />
          </el-form-item>
        </el-form>
      </div>
      <div class="ftf-content-item ftf-content-item-flex mt20">
        <div class="flex-2">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="执行内容" name="head" />
            <el-tab-pane label="执行对象" name="row" />
          </el-tabs>
          <EditTable v-show="activeName === 'head'" :height="height" :table-col="headerConfig" :data.sync="headList" :add-default="headerInit" />
          <EditTable v-show="activeName === 'row'" :height="height" :table-col="rowConfig" :data.sync="rowList" />
        </div>
        <div class="flex-2 ml">
          <div class="ftf-content-item-title">【实时预览-表模板】</div>
          <div class="table">
            <el-table border :data="tableCol" style="width: 100%" height="400px" :header-cell-style="{background: '#F7F7FB'}">
              <el-table-column prop="name" :label="table.title || '标题'" />
              <el-table-column v-for="(item,index) in tableTitle" :key="index" prop="prop" :label="item" />
            </el-table>
          </div>
        </div>
      </div>
    </card>

    <!-- 底部提交按钮 -->
    <el-button slot="footer" type="primary" size="large" @click="submit">确定</el-button>
  </edit-page>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import EditTable from './components/EditTable'
import { PLAN } from '@/assets/CONST'
import { temp } from '@/api/plan'
import props from './prop'
import { delView } from '@/utils/micro'

export default {
  name: 'PlanTemplateForm',
  components: { EditTable },
  data() {
    // 元素类型 单选 0 文本 1
    // 填项类型  计划时 0, 维保时 1
    return {
      ...props,
      loading: false,
      // 数据
      template: {},
      rules: {
        templateName: [{ required: true, message: '请输入模板名称', trigger: ['blur', 'change'] }],
        planType: [{ required: true, message: '请选择计划类型', trigger: ['blur', 'change'] }]
      },
      elementList: [this.$deepClone(props.eleInit)],
      tableRules: {
        name: [{ required: true, message: '请输入数据项标题', trigger: ['blur', 'change'] }],
        title: [{ required: true, message: '请输入标题', trigger: ['blur', 'change'] }]
      },
      headList: [this.$deepClone(props.headerInit)],
      rowList: [{}],
      table: {},
      activeName: 'head',
      PLAN
    }
  },
  computed: {
    // 执行内容 预览表格标题数据
    tableTitle() {
      let ret = ['执行内容']
      const data = this.headList?.filter(item => item?.name)?.map(item => item.name)
      if (!isEmpty(data)) {
        ret = data
      }
      return ret
    },
    // 执行对象 预览表格列数据
    tableCol() {
      let ret = [{ name: '执行对象' }]
      const data = this.rowList?.filter(item => item?.name)
      if (!isEmpty(data)) {
        ret = data
      }
      return ret
    }
  },
  watch: {
    '$route.query.id': {
      handler(nV, oV) {
        if (nV) {
          this.getInfo(nV)
        }
      }
    }
  },
  created() {
    const { id } = this.$route.query
    if (id) {
      this.getInfo(id)
    }
  },
  methods: {
    getInfo(id) {
      this.$_apiLoading(this, 'loading',
        () => temp.getInfo(id).then(res => {
          const { elementList, table, headList, template } = this.$deepClone(res.data)
          Object.assign(this, { elementList, table, headList, template, rowList: table.rowList.map(item => ({ name: item })) })
        })
      )
    },
    // 保存
    async submit() {
      const { elementList, table, template, headList, rowList } = this

      const validate = await this.validate()
      if (!validate) {
        return false
      }

      const row = rowList.map(item => item.name)
      table.rowList = row

      const data = { template, elementList, table, headList }
      this.$_apiLoading(this, 'loading',
        () => temp.save({ data }).then(res => {
          this.$message.success(this.$route.meta.title + '成功')
          // 关闭tag
          delView(this.$route)
          this.$router.replace({ name: 'PlanTemplate' })
        })
      )
    },
    // 保存时校验
    async validate() {
      const { elementList, headList, rowList } = this

      const isFormValid = await this.$refs.ruleForm.validate()
      const isTableFormValid = await this.$refs.tableForm.validate()
      if (!isFormValid || !isTableFormValid) {
        return false
      }
      if (!this.validateEmpty(elementList)) {
        this.$message.error('数据项不能为空')
        return false
      }
      if (!this.validateEmpty(headList)) {
        this.$message.error('执行内容不能为空')
        return false
      }
      if (!this.validateEmpty(rowList)) {
        this.$message.error('执行对象不能为空')
        return false
      }
      return true
    },

    validateEmpty(arr) {
      let ret = true
      if (isEmpty(arr)) {
        return false
      } else {
        try {
          arr.forEach(element => {
            if (isEmpty(element.name) || (element.elementType === 0 && isEmpty(element.options))) {
              ret = false
              throw new Error()
            }
          })
        } catch (error) {
          console.log('error')
        }
        return ret
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-primary: #3265DE;

.ml{
  margin-left: 100px;
}
.mt20{
  margin-top: 20px;
}
.ftf-base{
  padding:28px 10px;
  &-form{
    display: flex;
    flex-wrap: wrap;
    &-item{
      flex: 1;
      min-width: 300px;
      /deep/.el-input__inner{
        width: 260px;
      }
    }
  }
}
.ftf-content{
  &-item{
    &-flex{
      display: flex;
      justify-content: space-between;
      overflow: auto;
      .flex-2{
        flex:2;
        overflow: hidden;
      }
      .flex-1{
        flex: 1;
      }
    }
    &-title{
      color: $--color-primary;
      padding-bottom: 10px;
    }
  }
}
</style>
