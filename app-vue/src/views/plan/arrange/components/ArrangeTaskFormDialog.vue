<template>
  <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="执行人" prop="userId">
      <UserSelect v-model="form.userId" />
    </el-form-item>
    <el-form-item label="执行对象" prop="execElementIds">
      <PlanElementInput :id="id" v-model="form.execElementIds" />
    </el-form-item>
    <el-form-item label="执行日期" prop="execDateList">
      <el-date-picker
        v-model="form.execDateList"
        type="dates"
        placeholder="选择一个或多个日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-d"
      />
    </el-form-item>
    <el-form-item label="开始时间" prop="beginTime">
      <el-time-select
        v-model="form.beginTime"
        placeholder="起始时间"
        :picker-options="{
          start: '00:00',
          step:'00:15',
          end: '24:00',
        }"
      />
    </el-form-item>
    <el-form-item label="时间范围" prop="taskDuration">
      <el-input v-model="form.taskDuration" placeholder="" class="input-with-select">
        <el-select slot="append" v-model="form.taskTimeUnit" placeholder="请选择">
          <el-option label="小时" :value="2" />
          <el-option label="天" :value="3" />
          <el-option label="周" :value="4" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="跳过节假日" prop="skipHoliday">
      <el-switch v-model="form.skipHoliday" />
    </el-form-item>
  </el-form>
</template>

<script>
import PlanElementInput from '@/components/PlanElementInput'
import UserSelect from '@/components/UserSelect'
import { disabledDate } from '@/utils'

export default {
  components: { PlanElementInput, UserSelect },
  props: {
    data: Object,
    id: String
  },
  data() {
    return {
      form: {
        taskTimeUnit: 2,
        skipHoliday: false
      },
      rules: {
        userId: [{ required: true, message: '请选择执行人', trigger: 'blur' }],
        execElementIds: [{ required: true, message: '请选择执行对象', trigger: 'blur' }],
        execDateList: [{ required: true, message: '请选择执行日期', trigger: 'blur' }],
        beginTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        taskDuration: [
          { required: true, message: '请输入时间范围', trigger: 'blur' },
          { pattern: /^\d+$/, message: '请输入数值', trigger: 'blur' }
        ]
      },
      pickerOptions: { disabledDate }
    }
  },
  computed: {

  },
  watch: {
    data: {
      handler(nV, oV) {
        if (nV) {
          this.form = { taskTimeUnit: 2, skipHoliday: false, ...nV }
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    async getValue() {
      const isTrue = await this.$refs.ruleForm.validate()
      if (isTrue) {
        return this.form
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='scss'>
.input-with-select{
   width: 300px;
  .el-select .el-input {
    width: 100px;
  }
  .el-input-group__append {
    background-color: #fff;
  }
}
</style>
